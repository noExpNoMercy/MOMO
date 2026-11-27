"""Lay du lieu THAT tu feed cong khai -> dataset dac trung URL cho classifier on-device.
Malicious: OpenPhish (phishing), URLhaus (malware URL).  Benign: Majestic Million (top domains).
Chi trich dac trung tu CHUOI URL (khong chay gi tu du lieu tai ve). Ghi dataset.csv + summary."""
import re, math, csv, sys, urllib.request, io, random
sys.stdout.reconfigure(encoding="utf-8")
random.seed(7)
HERE = __file__.rsplit("\\",1)[0]

BAD_TLD = {"top","vip","xyz","cc","icu","buzz","click","live","online","win","loan","rest","shop","site","fit","tk","gq","work","support","cfd","sbs"}
BRAND = ["vcb","vietcombank","bidv","techcombank","mbbank","acb","vietinbank","agribank","tpbank","vpbank","sacombank","shopee","tiki","lazada","sendo","momo","zalopay","ghn","ghtk","evn","bhxh","vssid","vneid","dichvucong","etax","paypal","facebook","apple","microsoft","amazon","netflix","google"]
SUS = ["secure","verify","update","login","signin","account","confirm","wallet","bonus","gift","xacthuc","capnhat","uudai","nhanthuong","dangnhap","khuyenmai"]

def entropy(s):
    if not s: return 0.0
    from collections import Counter
    n=len(s); return -sum((c/n)*math.log2(c/n) for c in Counter(s).values())

def feats(url):
    u=url.strip()
    if not u or " " in u: return None
    low=u.lower()
    ns=re.sub(r'^[a-z][a-z0-9+.-]*://','',low)
    host=ns.split('/')[0].split('?')[0].split(':')[0]
    if '.' not in host: return None
    path=ns[len(ns.split('/')[0]):]
    parts=host.split('.'); tld=parts[-1]
    dig=sum(c.isdigit() for c in host)
    return [
        len(u), len(host), host.count('.'), host.count('-'), dig, dig/max(len(host),1),
        1 if re.match(r'^\d{1,3}(\.\d{1,3}){3}$',host) else 0,
        1 if '@' in u else 0, 1 if 'xn--' in host else 0,
        1 if tld in BAD_TLD else 0, len(tld), len(parts), len(path), u.count('='),
        round(entropy(host),4),
        1 if any(w in low for w in SUS) else 0,
        1 if any(b in host for b in BRAND) else 0,
    ]
FEATURE_NAMES=["url_len","host_len","dots","hyphens","host_digits","digit_ratio","is_ip","has_at","punycode","bad_tld","tld_len","num_labels","path_len","num_eq","host_entropy","sus_word","brand_token"]

def fetch(url, cap_bytes=8_000_000):
    req=urllib.request.Request(url, headers={"User-Agent":"research-url-classifier"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read(cap_bytes).decode("utf-8","ignore")

mal=set(); ben=set()
# --- Malicious: OpenPhish ---
try:
    txt=fetch("https://openphish.com/feed.txt")
    for line in txt.splitlines():
        if line.strip().startswith("http"): mal.add(line.strip())
    print(f"OpenPhish: {len(mal)} url")
except Exception as e: print("OpenPhish LOI:", e)
# --- Malicious: Phishing.Database (GitHub raw, cong khai) ---
for src in [
    "https://raw.githubusercontent.com/mitchellkrogza/Phishing.Database/master/phishing-links-ACTIVE.txt",
    "https://raw.githubusercontent.com/mitchellkrogza/Phishing.Database/master/phishing-links-NEW-today.txt",
]:
    try:
        txt=fetch(src, cap_bytes=6_000_000); n0=len(mal)
        for line in txt.splitlines():
            s=line.strip()
            if s.startswith("http"): mal.add(s)
        print(f"PhishDB {src.rsplit('/',1)[1]}: +{len(mal)-n0}")
    except Exception as e: print("PhishDB LOI", src.rsplit('/',1)[1], e)
# --- Malicious: URLhaus text feed (du phong) ---
try:
    txt=fetch("https://urlhaus.abuse.ch/downloads/text/", cap_bytes=4_000_000); n0=len(mal)
    for line in txt.splitlines():
        if line.startswith("http"): mal.add(line.strip())
    print(f"URLhaus text: +{len(mal)-n0}")
except Exception as e: print("URLhaus LOI:", e)
# --- Benign: Majestic Million (stream, lay top N domain) ---
try:
    req=urllib.request.Request("https://downloads.majestic.com/majestic_million.csv", headers={"User-Agent":"research"})
    with urllib.request.urlopen(req, timeout=25) as r:
        head=r.readline()
        while len(ben)<25000:
            ln=r.readline()
            if not ln: break
            cols=ln.decode("utf-8","ignore").split(",")
            if len(cols)>2 and "." in cols[2]:
                ben.add("http://"+cols[2].strip())
    print(f"Majestic benign: {len(ben)} domain")
except Exception as e: print("Majestic LOI:", e)

print(f"\nTONG THO: malicious={len(mal)}  benign={len(ben)}")
mal=list(mal); ben=list(ben); random.shuffle(mal); random.shuffle(ben)
N=min(len(mal), len(ben), 20000)    # can bang 1:1
mal=mal[:N]; ben=ben[:N]
print(f"Can bang 1:1 -> {N}/lop")
rows=[]
for u in mal:
    f=feats(u)
    if f: rows.append((f,1))
for u in ben:
    f=feats(u)
    if f: rows.append((f,0))
random.shuffle(rows)
with open(HERE+"\\dataset.csv","w",newline="",encoding="utf-8") as fp:
    w=csv.writer(fp); w.writerow(FEATURE_NAMES+["label"])
    for f,y in rows: w.writerow([*f,y])
pos=sum(1 for _,y in rows if y==1)
print(f"Dataset: {len(rows)} dong (phishing={pos}, benign={len(rows)-pos}) -> dataset.csv")
