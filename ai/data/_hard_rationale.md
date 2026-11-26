# Bộ test đối kháng "hard" cho A9 (staging)

File dữ liệu: `test_messages.hard.staging.json` (16 ca: 9 scam, 7 legit). Mục đích: lộ điểm yếu của A9, không phải để A9 ăn điểm.
Quy ước cột "risk kỳ vọng": điểm risk_score mà một bộ phát hiện tốt NÊN cho. "Dễ miss" = khả năng cao A9 chấm thấp hơn.
Với legit, ngưỡng báo động là RISK_ALERT = 50 (xem `lib/config.ts`); legit mà A9 chấm >= 50 là false positive.

---

## Nhóm A. SCAM "vùng xám" (kỳ vọng 45-65, tín hiệu mờ)

**hard-001** — vùng xám (lừa tình cảm giai đoạn đầu)
- Vì sao khó: chưa hỏi tiền, không hối thúc, không link. Chỉ có kể hoàn cảnh cô đơn, tiến triển tình cảm nhanh, xin chuyển sang Telegram "vì Zalo hay đứt", và hé "quỹ nhỏ lãi ổn định" rồi hẹn kể sau. Một người đọc bình thường sẽ thấy đây chỉ là người lạ thân thiện.
- Risk kỳ vọng: 45-60. Nên >= 50 nhưng rất dễ bị miss (A9 có thể chấm 15-30 vì "chưa có yêu cầu tiền"). Tactic mờ: T20 (lời hé "lãi ổn định") không đưa vào expected để khỏi phạt oan.
- Nguồn cảm hứng: claude_deepresearch.md mục 8 (đẩy tình cảm rất nhanh, né gọi video, dắt sang "đầu tư chung") và mục 8.4 (tình cảm làm nền rồi dẫn sang đầu tư); phần Gemini về chuyển kênh sang nhóm riêng.

**hard-007** — vùng xám (bạn cũ rủ góp vốn nghe hợp lý)
- Vì sao khó: có bối cảnh kinh doanh cụ thể (nhập cà phê nhân xanh, đơn quán), có hợp đồng, có người quen "đã nhận đủ", không dùng từ "cam kết không rủi ro" hay "bao lời". Lãi 8%/3 tháng là con số hợp lý hơn kiểu scam sách giáo khoa. Tín hiệu duy nhất yếu: lãi cố định, chốt danh sách trong tuần, gửi vào tk cá nhân rồi mới ký.
- Risk kỳ vọng: 45-60. Nên >= 50 nhưng dễ bị miss; A9 mà chấm < 30 thì bỏ lọt một vụ góp vốn đa cấp/gọi vốn gian.
- Nguồn cảm hứng: claude_deepresearch.md mục 6 (lời hứa lãi cố định, bằng chứng xã hội kiểu "người khác đã nhận") và mục 6.1 (hợp đồng làm bằng chứng giả); tinh thần "mồi lãi nhỏ, người quen dẫn dắt" ở _gemini_raw.md phần Gemini mục 6.

**hard-015** — vùng xám (nhờ nhận giùm bưu kiện)
- Vì sao khó: chỉ nhờ việc đời thường, trả công 200k, nhắc tên người quen chung (cô Lan) để tạo tin cậy. Chưa có tiền nào đi ra. Chỉ ở cuối mới cài "nếu shipper nhờ thanh toán thì bạn ứng giùm". Rất giống nhờ vả hàng xóm thật.
- Risk kỳ vọng: 40-60. Nên >= 50 nhưng dễ miss; nếu A9 chấm < 30 là bỏ lọt vì thiếu tín hiệu rõ.
- Nguồn cảm hứng: claude_deepresearch.md mục 1.4 (nhờ chuyển tiền trả shipper, lặp lại từng lần) và mục 7 (đường dây quà/bưu phẩm, leo thang từng khoản); chi tiết "ứng giùm rồi hoàn lại" lấy từ cách kẻ gian hạ rào cản bằng lời hứa trả ngay.

---

## Nhóm B. SCAM "nguỵ trang legit" (giọng lịch sự, 1 chi tiết nhỏ lộ ý đồ)

**hard-005** — nguỵ trang legit (CSKH nhà mạng đổi SIM 5G)
- Vì sao khó: toàn bộ giọng điệu lịch sự, "không gấp đâu ạ", miễn phí, không link, không đe doạ. Chi tiết duy nhất lộ: xin đọc lại "mã xác nhận 6 số" để "xác minh chính chủ". Đây là mô hình chiếm SIM/OTP rất thật nhưng nhìn như chăm sóc khách hàng.
- Risk kỳ vọng: 55-75. Nên >= 60 (xin mã là tín hiệu cứng), nhưng dễ miss nếu A9 bị giọng lịch sự đánh lừa và chấm ~35-45.
- Nguồn cảm hứng: claude_deepresearch.md mục 3 (cuộc gọi "nhân viên ngân hàng" hỏi 4 số cuối rồi OTP; hay xin từng mảnh thông tin); _gemini_raw.md mục 3.4 (dụ "hỗ trợ" sinh trắc học, kết bạn Zalo, gọi chăm sóc).

**hard-011** — nguỵ trang legit (tư vấn viên bảo hiểm gửi link rút gọn)
- Vì sao khó: người gửi nhắc đúng chuyện thật (nhắc phí kỳ năm 2, nhắc bối cảnh gặp mặt hồi tháng 3, thời gian ân hạn 30 ngày), không hối thúc. Chi tiết nhỏ duy nhất: link rút gọn lạ, đòi nhập số hợp đồng và thông tin thẻ. Tạo bẫy cho cả hai chiều: A9 bắt vì link thì đúng, nhưng dễ bỏ lọt nếu cho rằng "quen biết + lịch sự = an toàn".
- Risk kỳ vọng: 45-65. Nên >= 50 nhưng dễ miss.
- Nguồn cảm hứng: claude_deepresearch.md mục 3 (link thanh toán/xác thực giả mượn thương hiệu) và mục 4.1/4.3 (bắt đầu bằng trao đổi công việc thông thường, tin nhắn có số liệu cụ thể để tăng độ tin cậy).

**hard-013** — nguỵ trang legit (HR "tuyển dụng" thu phí khám sức khoẻ)
- Vì sao khó: có vòng CV, lịch phỏng vấn, địa điểm, yêu cầu mang CCCD, nói rõ "bình thường ko thu gì". Chi tiết lộ ý đồ: phí khám 450k chuyển vào tk cá nhân tên chính HR và lời "ko chuyển cũng ko sao" (đòn tâm lý ngược). Dễ bị nhầm với quy trình tuyển dụng thật.
- Risk kỳ vọng: 50-70. Nên >= 55 (phí + tk cá nhân), nhưng dễ miss.
- Nguồn cảm hứng: claude_deepresearch.md mục 5.3 (tuyển dụng online, đóng khung lừa đảo thành "thử thách tuyển dụng") và mục 7 (phí hồ sơ/phí thủ tục có tên gọi "hợp pháp", hứa hoàn lại sau).

---

## Nhóm C. SCAM "lộn xộn" (bám thực tế: không dấu, teencode, nhảy cóc, nhiễu)

**hard-003** — lộn xộn (giả chồng ở Hàn Quốc, bạn chồng tai nạn)
- Vì sao khó: toàn bộ không dấu, lẫn câu chuyện gia đình ("con ngủ chưa", "an com chua"), giọng người thân thật. Có gọi video nhưng hình mờ, lý do sóng yếu. Tên chủ tk khác người được nhắc; nạn nhân đã dao động và đề nghị chuyển 10 triệu trước.
- Risk kỳ vọng: >= 75 (cấp cứu + tk đổi tên + không nghe máy). Rủi ro miss thấp-vừa; điểm khó là A9 đọc đúng văn bản không dấu.
- Nguồn cảm hứng: _gemini_raw.md phần Gemini mẫu 1.4 (giả danh chồng ở Hàn Quốc nhờ chuyển tiền cấp cứu, gọi video xác minh vẫn bị lừa) và mẫu 1.3 (video mờ, sóng yếu).

**hard-009** — lộn xộn (sếp chuyển tiền thật trước rồi bảo chuyển lại qua QR tiệm vàng)
- Vì sao khó: tin có dấu lẫn không dấu, câu cụt, nhảy cóc (xen "nhớ nộp báo cáo quý trước thứ Sáu"). Điểm tinh vi: tiền thật đã vào tài khoản nạn nhân (có ảnh biến động số dư), nên phản xạ "mình đâu mất gì" làm giảm cảnh giác. Không có từ khoá lộ liễu.
- Risk kỳ vọng: 60-80. Nên >= 65, nhưng dễ miss nếu A9 không nhận ra mô hình "nhận tiền rồi chuyển hộ qua QR".
- Nguồn cảm hứng: claude_deepresearch.md mục 4.3 (Công an Phú Thọ: "lãnh đạo" chuyển tiền thật cho nhân viên, sau đó gửi QR "cửa hàng vàng bạc" yêu cầu chuyển lại) và mục 4.1 (uy quyền cấp bậc, né gọi máy/xác minh).

**hard-016** — lộn xộn (bạn cũ nhờ "bình chọn", đọc lại mã xác nhận Zalo)
- Vì sao khó: không dấu gần hết, câu ngắn, xen chuyện phiếm ("công ty cũ chuyển chỗ mới"), tài khoản quen đã bị chiếm. Hành động xin rất nhỏ ("bình chọn", "mất 5 phút") nhưng bước cuối là đọc mã 6 số của Zalo, tức chiếm tài khoản để lan tiếp.
- Risk kỳ vọng: 65-85. Nên >= 70; dễ miss nếu A9 coi đây chỉ là nhờ vả quen biết.
- Nguồn cảm hứng: claude_deepresearch.md mục 4.2 (Zalo bị chiếm sau khi bấm link "bình chọn cho con gái") và mục 1.3 (kẻ gian chưa vay ngay mà gửi link "bình chọn", "nhận quà" để chiếm tài khoản người khác trong danh bạ).

---

## Nhóm D. LEGIT "bẫy false-positive" (thoạt nhìn giống lừa, thật vô hại)

**hard-002** — FP-trap (sếp thật nhờ ứng tiền trả cước xe cho đối tác)
- Vì sao khó: có đủ từ nhạy cảm: sếp, "ứng tiền cá nhân", "chuyển giúp", "đang họp", "gấp", số tài khoản đối tác. Nhưng có ngữ cảnh công ty rõ (PO-1142, hoá đơn vận chuyển trong folder chung, kế toán Mai làm phiếu hoàn ứng), nhân viên tự đối chiếu tên công ty khớp hoá đơn.
- Risk kỳ vọng: < 30. Nếu A9 >= 50 thì báo oan nặng (nhầm T10/T01).
- Nguồn cảm hứng: claude_deepresearch.md mục 4 (đối chiếu: kịch bản BEC "sếp nhờ chuyển cho đối tác" thật có chứng từ nội bộ, ngược với vụ giả mạo luôn né xác minh).

**hard-004** — FP-trap (biến động số dư thật + người mua đồ cũ)
- Vì sao khó: có "+1,850,000", "ck", "check giúp", "tài khoản", tin nhắn ngân hàng không dấu viết hoa dễ giống SMS giả. Không link, không xin OTP; tin ngân hàng còn nhắc không bao giờ yêu cầu OTP/mật khẩu.
- Risk kỳ vọng: < 20. Nếu A9 >= 50 thì lộ FP trên SMS không dấu.
- Nguồn cảm hứng: claude_deepresearch.md mục 3 (SMS giả có đặc điểm không dấu: lưu ý ngược lại để kiểm tra A9 không chỉ dựa vào "không dấu"); khuyến nghị "mẫu âm khó" ở phần Recommendations (SMS ngân hàng thật).

**hard-006** — FP-trap (shipper thật báo đổi giờ, thu hộ COD đúng đơn đã đặt)
- Vì sao khó: có "shipper", "COD", "quét QR", "mã đơn", "ghim vị trí", yêu cầu gửi thông tin. Nhưng đơn do chính người dùng đặt ở shop xác định, không link, không xin OTP, không đổi tk.
- Risk kỳ vọng: < 25. Nếu A9 >= 50 là nhầm shipper thật với T09/T35.
- Nguồn cảm hứng: claude_deepresearch.md mục 1.4 và mục 7 (lừa đảo "shipper" là chiêu thật; bộ này kiểm tra A9 phân biệt shipper thật không đòi chuyển khoản trước).

**hard-008** — FP-trap (nhắc nợ thật giữa bạn bè)
- Vì sao khó: có nhắc lần 2, "cần gấp", doạ đùa "đăng lên group lớp", đòi chuyển khoản vào stk cũ. Dễ bị gắn T01/T19/T17. Nhưng có lịch sử cụ thể (mượn 3tr8 đi đám cưới tháng 8, gửi lại sao kê), stk là số cũ, người nhắc nói rõ "đùa thôi".
- Risk kỳ vọng: < 30. Nếu A9 >= 50 là báo oan vì nhầm đòi nợ thật với ép buộc.
- Nguồn cảm hứng: claude_deepresearch.md mục 1 (vay tiền người quen hay dùng "gấp", "bạn bè mà"); đảo ngược để kiểm tra phân biệt nhắc nợ thật và gây áp lực tội lỗi (T19).

**hard-010** — FP-trap (chị gái thật vay tiền viện phí, "đừng báo mẹ")
- Vì sao khó: cùng lúc có người thân, bệnh viện, tạm ứng 12tr, "chuyển giúp", "đừng báo mẹ vội". Đây là tổ hợp T06+T18+T13+T01 nhìn rất giống dev-016. Nhưng có kiểm chứng đầy đủ: gọi video 3 phút thấy chị và bé truyền nước, ảnh phiếu tạm ứng, tk cũ vẫn dùng, lý do giấu mẹ là huyết áp cao.
- Risk kỳ vọng: < 35. Đây là ca FP khó nhất; A9 >= 50 nghĩa là A9 chỉ khớp từ khoá, không đọc bằng chứng kiểm chứng.
- Nguồn cảm hứng: claude_deepresearch.md mục 1.5 (kẻ gian dặn "đừng nhắn cho chồng biết") và _gemini_raw.md mẫu 1.4 (cấp cứu + gọi video); đảo ngược bằng chứng kiểm chứng.

**hard-012** — FP-trap (shop quen khuyến mãi thật, hàng còn ít, cọc 100k)
- Vì sao khó: có "sale", "tới hết chủ nhật", "còn đúng 2 cái", "cọc 100k", "chuyển khoản", tên chủ shop cá nhân. Đủ tín hiệu T02/T04/T40 của scam. Nhưng khách quen, stk cũ trùng lần mua tháng 9, số tiền nhỏ, không link.
- Risk kỳ vọng: < 30. Nếu A9 >= 50 là nhầm khuyến mãi thật.
- Nguồn cảm hứng: claude_deepresearch.md mục 7 và mục 5 (khuyến mãi, "chỉ còn", cọc là chiêu thật; đảo ngược bằng bối cảnh khách quen).

**hard-014** — FP-trap (bạn mời cưới, QR mừng cưới đứng tên chú rể)
- Vì sao khó: có "mã QR", "ck", tài khoản tên người khác (chồng sắp cưới), "tk mới mở", "bàn chỉ giữ tới 11h45". Đủ để A9 gắn T32/T35/T02. Nhưng người nhận xác minh qua nhóm lớp, quyết định đi dự và không chuyển khoản, nên không có rủi ro.
- Risk kỳ vọng: < 25. Nếu A9 >= 50 là báo oan trên tình huống đám cưới thật.
- Nguồn cảm hứng: claude_deepresearch.md mục 4.3 (QR chuyển tiền là chiêu thật, "tài khoản tên người khác"); bộ này đảo ngược để kiểm tra A9 không báo oan mọi QR/tk khác tên.

---

## Tổng hợp độ khó
- Scam khó bắt (kỳ vọng thấp, dễ miss): hard-001, hard-007, hard-015 (vùng xám), hard-011, hard-013, hard-005 (nguỵ trang).
- Scam bắt được nhưng cần đọc văn bản nhiễu: hard-003, hard-009, hard-016.
- Bẫy FP mạnh nhất: hard-010 (dấu hiệu T13/T18 nhưng có kiểm chứng), hard-002 (sếp nhờ chuyển), hard-014 (QR + tk khác tên).
- Không có câu nào chép `example_vi` của `tactics_map.json`; không trùng kịch bản trong bộ dev/holdout.
