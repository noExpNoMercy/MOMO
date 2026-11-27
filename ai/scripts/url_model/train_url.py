"""Logistic regression pure-python cho URL classifier. Doc dataset.csv -> model.json + eval held-out."""
import csv, json, math, random, sys
sys.stdout.reconfigure(encoding="utf-8")
random.seed(13)
DATA = sys.argv[1]
OUT = sys.argv[2]

rows=[]
with open(DATA, encoding="utf-8") as fp:
    r=csv.reader(fp); names=next(r)[:-1]
    for row in r:
        rows.append(([float(x) for x in row[:-1]], int(row[-1])))
random.shuffle(rows)
nf=len(names)
cut=int(len(rows)*0.8)
train, test = rows[:cut], rows[cut:]

# Chuan hoa theo train
mean=[0.0]*nf; std=[0.0]*nf
for x,_ in train:
    for j in range(nf): mean[j]+=x[j]
mean=[m/len(train) for m in mean]
for x,_ in train:
    for j in range(nf): std[j]+=(x[j]-mean[j])**2
std=[math.sqrt(s/len(train)) or 1.0 for s in std]
def norm(x): return [(x[j]-mean[j])/std[j] for j in range(nf)]
Xtr=[norm(x) for x,_ in train]; ytr=[y for _,y in train]
Xte=[norm(x) for x,_ in test];  yte=[y for _,y in test]

w=[0.0]*nf; b=0.0
lr=0.3; L2=1e-4; EPOCHS=200
def sig(z): return 1/(1+math.exp(-z)) if z>-700 else 0.0
for ep in range(EPOCHS):
    gw=[0.0]*nf; gb=0.0
    for x,y in zip(Xtr,ytr):
        p=sig(sum(w[j]*x[j] for j in range(nf))+b)
        e=p-y
        for j in range(nf): gw[j]+=e*x[j]
        gb+=e
    n=len(Xtr)
    for j in range(nf): w[j]-=lr*(gw[j]/n+L2*w[j])
    b-=lr*gb/n

def predict(X): return [sig(sum(w[j]*x[j] for j in range(nf))+b) for x in X]
def metrics(y,p,th):
    tp=sum(1 for yi,pi in zip(y,p) if pi>=th and yi==1)
    fp=sum(1 for yi,pi in zip(y,p) if pi>=th and yi==0)
    fn=sum(1 for yi,pi in zip(y,p) if pi<th and yi==1)
    tn=sum(1 for yi,pi in zip(y,p) if pi<th and yi==0)
    acc=(tp+tn)/len(y); prec=tp/(tp+fp) if tp+fp else 0; rec=tp/(tp+fn) if tp+fn else 0
    f1=2*prec*rec/(prec+rec) if prec+rec else 0
    return acc,prec,rec,f1,fp,tn
def auc(y,p):
    pos=[pi for yi,pi in zip(y,p) if yi==1]; neg=[pi for yi,pi in zip(y,p) if yi==0]
    if not pos or not neg: return 0
    allp=sorted([(pi,yi) for yi,pi in zip(y,p)]); rank=0; i=0
    # Mann-Whitney
    s=sorted(range(len(p)), key=lambda k:p[k]); r=[0]*len(p)
    for idx,k in enumerate(s): r[k]=idx+1
    sr=sum(r[k] for k in range(len(p)) if y[k]==1)
    return (sr - len(pos)*(len(pos)+1)/2)/(len(pos)*len(neg))

pte=predict(Xte)
TH=0.5
acc,prec,rec,f1,fp,tn=metrics(yte,pte,TH)
A=auc(yte,pte)
print(f"Test n={len(yte)}  Accuracy={acc*100:.1f}%  Precision={prec*100:.1f}%  Recall={rec*100:.1f}%  F1={f1*100:.1f}%  AUC={A:.3f}")
print(f"False positive tren benign: {fp}/{fp+tn} = {fp/(fp+tn)*100:.2f}%")
# trong so theo do lon (dac trung nao quan trong)
imp=sorted(zip(names,w), key=lambda t:-abs(t[1]))
print("Top dac trung:", ", ".join(f"{n}:{v:+.2f}" for n,v in imp[:7]))

json.dump({"features":names,"mean":mean,"std":std,"weights":w,"bias":b,"threshold":TH},
          open(OUT,"w",encoding="utf-8"), ensure_ascii=False, indent=1)
print("Da luu", OUT)
