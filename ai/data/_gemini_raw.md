# Nguồn lừa đảo thật — DeepResearch tổng hợp (Gemini + Claude)

> File nguồn cho /toi-uu-a9 Pha 1. Hợp nhất 2 báo cáo DeepResearch do Khánh thu thập.
> Lưu ngày 2026-11-26. Dùng để LẤY CẢM HỨNG viết lại tin test, KHÔNG chép nguyên văn vào dataset công bố.
> Quy ước: [NV] = nguyên văn báo/công an đăng; [DG] = diễn giải, không phải tin nhắn thật.

---

# PHẦN I — BÁO CÁO CLAUDE DEEP RESEARCH
(8 dạng, trích nguyên văn có nguồn, phân tích thủ thuật)

# Kho hội thoại lừa đảo tài chính tại Việt Nam đã công bố công khai: 8 dạng, trích nguyên văn, có nguồn và phân tích thủ thuật

**TL;DR**
- Báo chí chính thống và công an Việt Nam rất hiếm khi đăng nguyên một đoạn chat 5–15 tin nhắn dưới dạng văn bản. Phần lớn hội thoại nằm trong ảnh chụp màn hình; phần chữ chỉ trích 1–4 câu then chốt. Tôi tìm được 3 đoạn đa lượt tương đối đầy đủ: giả "sếp" vay 12 triệu (VietnamNet), giả công an qua video call (VietnamNet) và "bạn trai ca sĩ" (VnExpress 23/11/2026). Ngoài ra còn hàng chục câu nguyên văn rời của kẻ lừa đảo, đủ để dựng "mẫu hạt giống" (seed) cho cả 8 dạng.
- Mẫu tâm lý lặp lại ở mọi dạng: tạo khẩn cấp ("bốn giờ chiều", "30 phút"), mượn uy quyền hoặc danh tính quen, cô lập nạn nhân ("giữ bí mật", "đừng nhắn cho chồng", "về nhà đi"), mồi lãi nhỏ rồi leo thang, và đòi "phí" để nhận hay rút tiền. Đây là các đặc trưng nên gán nhãn trong dataset.
- Khuyến nghị: dùng các câu nguyên văn dưới đây làm tập "gold" có nguồn, rồi bổ sung bằng OCR ảnh chụp màn hình trong các bài báo và sinh dữ liệu tổng hợp có kiểm soát. Không nên trình bày dữ liệu tổng hợp như "hội thoại thật". Văn bản không dấu xuất hiện rõ nhất ở SMS giả ngân hàng; teencode gần như không có trong phần chữ báo chí đăng lại.

---

## Key Findings

1. **Mức độ sẵn có của "hội thoại thật dạng văn bản" thấp.** Các bài báo thường dẫn từng câu và diễn giải phần còn lại; toàn bộ đoạn chat nằm trong ảnh, chú thích kiểu "Nội dung tin nhắn của bị hại với nhóm lừa đảo trên Zalo". Ví dụ: VnExpress đưa tin ngày 2/1/2024 Công an tỉnh Đắk Lắk tiếp nhận đơn của 44 người bị lừa qua các nhóm đầu tư tài chính online trên Facebook, Zalo, Telegram, bị chiếm đoạt hơn 64 tỷ đồng. Một lượt rà soát chuyên sâu riêng cho dạng đầu tư và làm nhiệm vụ cũng xác nhận điều này: không bài nào trong 4 bài đọc toàn văn in liền 4 lượt chat trở lên có ghi người gửi.
2. **Ba đoạn đa lượt tốt nhất để làm mẫu chuẩn**:
   - VietnamNet 12/12/2023: giả danh "sếp"/người quen vay 12 triệu, 7 lượt.\[1\]
   - VietnamNet 28/7/2025: đối thoại giữa người mẹ và "công an" giả, khoảng 10 lượt.\[2\]
   - VnExpress 23/11/2026: "bạn trai ca sĩ" lộ sơ hở khi nhắn "chồng yêu dấu của em".\[3\]
3. **Văn bản không dấu và lỗi chính tả có thật nằm ở SMS giả ngân hàng**, ví dụ "Tai khoan cua quy khach da dang ky chuong trinh quang cao tren TikTok, moi thang thu phi 5,600,000VND" (PLO/Tuổi Trẻ),\[4\] và ở tin vay tiền qua Zalo hack, ví dụ "30 triệu k0 (không)" (Tuổi Trẻ, 14/11/2026).\[5\]
4. **Quy mô thiệt hại được báo chí ghi nhận rất lớn.**
   - Nhóm Mr Pips: theo VTV (4/7/2026), kết luận điều tra bổ sung của Công an TP Hà Nội xác định 188 bị can thực hiện 920 vụ, chiếm đoạt hơn 1.568 tỷ đồng. Con số "5.200 tỷ" hay được nhắc là giá trị tài sản bị thu giữ, phong tỏa, không phải số tiền chiếm đoạt.
   - Một phụ nữ 44 tuổi ở Hà Đông bị lừa kiểu tình cảm kết hợp đầu tư, tổng thiệt hại "khoảng 9 tỷ đồng" (VnExpress, 2/4/2025, dẫn Công an Hà Nội).
   - Chuyên án 0525L của Công an tỉnh Lai Châu bắt 59 người ngày 28–29/10/2025; cầm đầu là Sùng Thị Mải, 26 tuổi, ẩn ở khu vực Bokor (Campuchia). Theo CAND, nhóm "chiếm đoạt tiền của hơn 8.000 bị hại trên cả nước, ước tính số tiền chiếm đoạt khoảng trên 300 tỷ đồng". Thủ đoạn gồm giả công an, quân đội, shipper và lừa tình cảm.

---

## Quy ước trình bày

- **[NV]** = nguyên văn như báo/công an đăng (giữ chính tả gốc).
- **[DG]** = báo chỉ diễn giải, không có nguyên văn. Tôi giữ để mô tả diễn biến, **không** được coi là tin nhắn thật trong dataset.
- KLĐ = kẻ lừa đảo; NN = nạn nhân.

---

## 1. Giả danh người thân/bạn bè (hack hoặc giả tài khoản Facebook, Zalo)

**Đặc điểm chung:** Tin nhắn đến từ chính tài khoản quen (bị chiếm quyền qua link "bình chọn", "nhận quà") hoặc tài khoản giả cùng ảnh và tên.\[6\]\[7\] Tin ngắn, số tiền cụ thể, hứa trả nhanh, kèm lý do vì sao người "quen" không tự chuyển được (thẻ lỗi, app bảo trì).\[8\] Kẻ gian thường lặp lại yêu cầu nhiều lần.\[9\]

**#1.1 – VnExpress, "Chiếm tài khoản Facebook để mạo danh vay tiền"** – https://vnexpress.net/chiem-tai-khoan-facebook-de-mao-danh-vay-tien-4062105.html
- KLĐ (từ tài khoản Facebook của chị Phương) → bạn: **[NV]** "Chị có tiền không chuyển cho em vay 50 triệu"\[10\]
- KLĐ (từ tài khoản của chị Trang) → bạn: **[NV]** "em trả tiền hàng luôn qua tài khoản này cho chị với"\[10\]
- **[DG]** Một người bạn chuyển 60 triệu; tổng cộng 6 người bạn của Trang mất 154 triệu. Tiền vào tài khoản mang tên Do Van Tung (ACB). Theo các nạn nhân, ngôn từ "giống y hệt" chủ tài khoản.\[10\]\[11\]
- *Thủ thuật:* giả vờ là người quen; khai thác lịch sử chat để bắt chước giọng văn; dùng lý do thường ngày (trả tiền hàng) để giảm nghi ngờ.

**#1.2 – Báo Lai Châu, "Cảnh giác với thủ đoạn mượn tiền qua tin nhắn facebook"** (vụ ngày 30/6/2021) – https://baolaichau.vn/%E1%BB%91ng-k%C3%ADnh-ph%C3%B3ng-vi%C3%AAn/c%E1%BA%A3nh-gi%C3%A1c-v%E1%BB%9Bi-th%E1%BB%A7-%C4%91o%E1%BA%A1n-m%C6%B0%E1%BB%A3n-ti%E1%BB%81n-qua-tin-nh%E1%BA%AFn-facebook
- KLĐ (tài khoản "Tăng Thúy Kiều") → NN (tài khoản "Bese Lai Châu"), 13h34: **[NV]** "Tài khoản em còn dư không, thẻ chị đang bị lỗi. Em còn tiền không, chuyển giúp chị 8 triệu đồng."\[8\]
- **[DG]** Người nhận nghi ngờ nên không chuyển. Trong cùng vụ, một số người khác đã chuyển vào tài khoản 19033561125038 mang tên Phạm Nhật Trường (Techcombank).\[8\]
- *Thủ thuật:* mở bằng câu dò số dư ("còn dư không"); viện lý do kỹ thuật ("thẻ lỗi") để giải thích vì sao phải nhờ.

**#1.3 – Cục An ninh mạng (qua Hoa Học Trò/CafeF, 10/2026), "Nhận tin nhắn vay tiền từ chính tài khoản người quen"** – https://hoahoctro.tienphong.vn/nhan-tin-nhan-vay-tien-tu-chinh-tai-khoan-nguoi-quen-can-than-bay-lua-dao-post1882799.tpo
- KLĐ: **[NV]** "Anh/em đang có việc gấp, chuyển giúp anh/em 15 triệu đồng, sáng mai anh/em gửi lại"\[12\]\[13\]
- **[DG]** Công an tỉnh Tây Ninh lưu ý kẻ gian có thể chưa vay ngay mà gửi link "bình chọn", "nhận quà" để chiếm tiếp tài khoản của người khác trong danh bạ.\[6\]
- *Thủ thuật:* khẩn cấp ("việc gấp"), cam kết trả rất sớm ("sáng mai") để hạ rào cản.

**#1.4 – VnExpress (mục Ý kiến, 13/11/2026), "Con tôi bị chiếm tài khoản Messenger, bạn bè sập bẫy mất tiền"** – https://vnexpress.net/con-toi-bi-hack-messenger-hoc-sinh-mat-tien-lua-dao-online-5143954.html
- **[DG]** KLĐ dùng Messenger của một nữ sinh cấp 3 nhắn khoảng hơn 80 bạn, nhờ chuyển tiền trả shipper và hứa hoàn ngay. Sau lần 1 lại nhờ "đơn ship lần hai, rồi lần ba… cho đến khi bạn đó hết tiền trong tài khoản".\[9\]
- *Thủ thuật:* leo thang cam kết (foot-in-the-door); nhắm vào nhóm ít kinh nghiệm (học sinh); khai thác lòng tốt với bạn bè.

**#1.5 – VTV (27/6/2026), "Từ dữ liệu lộ lọt, các đối tượng giả mạo người thân lừa đảo vay tiền"** – https://vtv.vn/tu-du-lieu-lo-lot-cac-doi-tuong-gia-mao-nguoi-than-lua-dao-vay-tien-100260627110008053.htm
- NN (chị Đoàn Kim Ngọc, Nha Trang) kể lời KLĐ: **[NV]** "Nó nói đừng nhắn tin cho chồng mình biết."\[14\]
- **[DG]** Người em gọi vào Facebook giả hỏi mượn 150 triệu; tiền đi qua tài khoản người em rồi tới một "đối tác làm ăn".\[14\]
- *Thủ thuật:* **cô lập nạn nhân** (giữ bí mật với vợ hoặc chồng); dàn dựng để chính người thân thật làm trung gian chuyển tiền.

**Kết luận dạng 1:** Có 5 nguồn (4 nguồn có câu nguyên văn), nhưng chưa nguồn nào có đoạn chat dài trên 2 lượt dưới dạng văn bản. Biến thể mới nhất được Công an Khánh Hòa cảnh báo ngày 6/10/2026: kẻ gian dùng Zalo giả, rồi xúi nạn nhân tự gọi cho người thân thật để "đóng vai" người vay.\[15\]

---

## 2. Giả danh công an / viện kiểm sát / tòa án ("rửa tiền", "tài khoản an toàn", "bắt cóc online")

**Đặc điểm chung:** Mở đầu bằng "bưu phẩm bị giữ" hoặc "đơn hàng có vấn đề". Kẻ gian chuyển máy qua nhiều "cấp" (đại úy → viện trưởng VKS), gửi lệnh bắt giả qua Zalo, ép giữ bí mật, đặt hạn chót và yêu cầu chuyển tiền "để xác minh, sẽ trả lại". Biến thể 2025–2026 là "bắt cóc online": nạn nhân trẻ bị ép tự cô lập trong khách sạn và quay video để đòi tiền chuộc từ gia đình.\[16\]

**#2.1 – Znews (21/8/2018), "Nhóm lừa đảo gửi lệnh bắt người, buộc nạn nhân chuyển 2 tỷ"** (ông Trần Văn Thảo, 63 tuổi, Cần Thơ) – https://znews.vn/nhom-lua-dao-gui-lenh-bat-nguoi-buoc-nan-nhan-chuyen-2-ty-post870259.html
1. KLĐ (giọng nữ, gọi máy bàn): **[DG]** bưu phẩm gửi ra nước ngoài của ông bị Công an TP.HCM tạm giữ; "muốn biết rõ thì bấm số 9".\[17\]
2. NN: **[NV]** "5 năm rồi, tôi có đi đâu mà gửi bưu phẩm"\[17\]
3. KLĐ ("đại úy Công an TP.HCM"): **[DG]** trong bưu phẩm có 100 thẻ ATM; vụ án rửa tiền, ma túy.\[17\]
4. KLĐ: **[NV]** "Nghi can bị bắt tên Nguyễn Huy Hoàng khai ra anh trong đường dây này. Anh không được tắt điện thoại, chúng tôi đang gọi cho Viện KSND Tối cao"\[17\]
5. KLĐ: **[NV]** "Toàn bộ cuộc gọi đều được ghi âm, anh phải cam kết giữ bí mật. Anh mà tiết lộ là phải chịu trách nhiệm pháp luật"\[17\]
6. KLĐ ("Viện trưởng VKSND Tối cao", qua mạng xã hội): **[DG]** gửi "lệnh tạm giữ người", lệnh bắt tạm giam 30 ngày có đủ thông tin cá nhân của ông.\[17\]
7. KLĐ: **[NV]** "Bọn rửa tiền, mua bán ma túy khai đã chuyển vào tài khoản của anh 6,8 tỷ đồng. Bây giờ là bốn giờ chiều, nếu anh không chuyển kịp thì tôi không cứu nổi"\[17\]
8. KLĐ: **[NV]** "Số tiền này sẽ được phong tỏa, nếu điều tra anh không liên quan đến đường dây tội phạm thì sẽ được trả lại"\[17\]
9. **[DG]** Kẻ gian dặn ông không được tiết lộ kể cả khi nhân viên ngân hàng hỏi. Ông hỏi bạn làm tố tụng, rồi trình báo và **không mất tiền**.\[17\]
- *Thủ thuật:* uy quyền nhiều tầng; bằng chứng giả (lệnh bắt, dữ liệu cá nhân chính xác); đe dọa; hạn chót; cô lập (bí mật, không nói với ngân hàng); hứa hoàn tiền để giảm cảm giác mất mát.

**#2.2 – VietnamNet (28/7/2025), "Kẻ giả danh công an lộ mặt qua cuộc gọi video với người phụ nữ cao tay"** – https://vietnamnet.vn/gia-danh-cong-an-lo-mat-qua-cuoc-goi-clip-man-kich-lo-bich-bi-boc-tran-2425839.html (đoạn clip hơn 4 phút)
1. Người mẹ: **[DG]** yêu cầu xác minh danh tính cán bộ.\[2\]
2. KLĐ: **[NV]** "Tôi tên Phan Tùng Lâm… cô nhìn vào biển tên trên ngực đây này"\[2\]
3. KLĐ: **[NV]** "Cô đang nói chuyện với cơ quan chức năng. Tôi là người thi hành pháp luật… Chúng cháu rất tôn trọng người dân, nhưng đừng dân chủ quá trớn, cô nhé"\[2\]
4. KLĐ (quay sang người bên cạnh): **[NV]** "Đồng chí thi hành lệnh bắt cho tôi" … "Bắt đối tượng lên đây"\[2\]
5. KLĐ: **[NV]** "Cô nghe cháu nói này… Cháu rất tôn trọng cô, nhưng cô lại không tôn trọng lực lượng chức năng"\[2\]
6. Người mẹ: **[NV]** "Tôi rất tôn trọng, nhưng con tôi ở xa mới về. Nó có đặt đơn hàng nào đâu, tại sao cán bộ lại nói vậy?"\[2\]
7. KLĐ: **[NV]** "Chúng tôi chỉ cần xác minh thông tin, việc gì phải bù lu bù loa lên… đã bắt con cô, khép tội cô đâu"\[2\]
8. Người mẹ: **[NV]** "Có việc gì, công an phường sẽ gửi giấy mời, ai lại gọi điện thoại, kết bạn Zalo rồi đe dọa"\[2\]
9. KLĐ: **[NV]** "Tôi không làm việc với cô nữa. Sẽ thi hành lệnh bắt giữ con cô trong 30 ngày"\[2\]
10. Người con: **[NV]** "Các anh giống công an giả quá" → KLĐ tắt máy.\[2\]
- *Thủ thuật:* uy quyền (đồng phục, biển tên); đe dọa bắt; dàn cảnh "ra lệnh" cho đồng bọn; xen kẽ đe dọa và xoa dịu ("cháu rất tôn trọng cô"); quy lỗi cho nạn nhân ("không tôn trọng lực lượng chức năng"). **Dấu hiệu nhận diện tốt cho mô hình:** đối tượng từ chối cho nói chuyện trực tiếp với người bị "điều tra".
- Cùng bài: sinh viên M. (sinh năm 2006, Hà Nội) bị ép tự vẽ thương tích, quay video gửi gia đình đòi 370 triệu, kèm đe dọa "chặt ngón tay"; được tìm thấy trong khách sạn trên đường La Thành.\[2\]

**#2.3 – VnExpress (2026), "Vợ chồng tìm mọi cách chuyển 700 triệu đồng cho kẻ lừa đảo"** – https://vnexpress.net/vo-chong-tim-moi-cach-chuyen-700-trieu-dong-cho-ke-lua-dao-5148263.html
- **[DG]** Người gọi tự xưng cán bộ Công an Trung ương, gửi lệnh bắt giả "có dấu Bộ Công an". Vợ chồng được hướng dẫn mua điện thoại mới, mở tài khoản ở ngân hàng khác và cung cấp mật khẩu, OTP. Kẻ gian còn dặn: nếu ai hỏi thì con gái cứ xác nhận bố mẹ đang cần chuyển tiền. Giám đốc ngân hàng, công an và con cái mất gần hai ngày mới thuyết phục được.\[18\]
- *Thủ thuật:* cô lập (thiết bị mới, ngân hàng mới); chuẩn bị sẵn kịch bản trả lời người thân; kéo dài áp lực liên tục trong hai ngày.

**#2.4 – VnExpress, "Nhận diện thủ đoạn giả công an gọi điện thoại lừa 'liên quan vụ án'"** – https://vnexpress.net/cach-doc-vi-thu-doan-gia-cong-an-goi-dien-thoai-lua-lien-quan-vu-an-4852326.html
- **[DG]** Một "trưởng phòng hình sự" nói nạn nhân liên quan đường dây ma túy và mở tài khoản 20 tỷ, yêu cầu chuyển tiền "chứng minh tài sản hợp pháp" và giữ kín. Ngày 18/12/2024 nạn nhân chuyển 2,3 tỷ. Biến thể mới: kẻ gian dụ nạn nhân bật video để lấy khuôn mặt vượt sinh trắc học.\[19\]

**Kết luận dạng 2:** Có 2 đoạn đa lượt tốt (#2.1, #2.2) và 2 kịch bản diễn giải. Điểm đáng chú ý: phần lớn dạng này diễn ra qua **cuộc gọi**; tin nhắn chủ yếu dùng để gửi "lệnh bắt" và số tài khoản. Dataset text-only sẽ bỏ sót nếu không có transcript giọng nói.

---

## 3. Giả danh ngân hàng (SMS brandname, link giả, OTP, "nâng hạn mức")

**Đặc điểm chung:** Có hai kênh. (a) SMS mang brandname ngân hàng, phát qua trạm BTS giả (IMSI catcher), thường **viết không dấu**, cảnh báo khóa tài khoản, đăng nhập lạ hoặc trừ phí, kèm link.\[4\]\[20\]\[21\] (b) Cuộc gọi "nhân viên ngân hàng" mời nâng hạn mức thẻ tín dụng hoặc hoàn phí, rồi xin 4 số cuối thẻ, CVV và OTP.

**#3.1 – Tuổi Trẻ/PLO, "Cảnh giác việc giả mạo ngân hàng, gửi tin nhắn lừa đảo"** – https://tuoitre.vn/plo/canh-giac-viec-gia-mao-ngan-hang-gui-tin-nhan-lua-dao-109701791.htm
- SMS (brandname "NH S"): **[NV]** "Tai khoan cua quy khach da dang ky chuong trinh quang cao tren TikTok, moi thang thu phi 5,600,000VND."\[4\]
- SMS (brandname "NH V", cuối 9/2022, quận 1): **[NV]** "Tai khoan cua ban dang duoc dang nhap tren thiet bi khac, neu khong phai ban dang nhap vui long vao https://v..." \[4\]
- *Thủ thuật:* gây sợ mất tiền (phí lớn, đăng nhập lạ); mượn uy tín thương hiệu (brandname thật); hành động ngay qua link.

**#3.2 – Tuổi Trẻ/PLO, "Cảnh giác thủ đoạn mạo danh ngân hàng gửi tin nhắn lừa đảo"** – https://tuoitre.vn/plo/canh-giac-thu-doan-mao-danh-ngan-hang-gui-tin-nhan-lua-dao-109664370.htm
- SMS: **[NV]** "Tài khoản của quý khách vừa mở dịch vụ tài chính toàn cầu với phí dịch vụ hàng tháng là 2.800.000 VND sẽ bị trừ trong hai giờ."\[22\]
- *Thủ thuật:* hạn chót ("trong hai giờ"); số tiền cụ thể để tăng độ tin cậy.

**#3.3 – VietnamNet, "Tin nhắn mạo danh ngân hàng để lừa đảo dồn dập tấn công người dùng"** – https://vietnamnet.vn/ngo-ngang-vi-nhan-tin-nhan-lua-dao-doa-khoa-tai-khoan-ngan-hang-i289507.html
- SMS (hiển thị "VietinBank"): **[NV]** "VietinBank trân trọng thông báo tài khoản của quý khách hiện tại đã bị khóa" + link đăng nhập "xác thực". Báo ghi chú: link chứa tên ngân hàng cùng ký tự viết tắt, nội dung **viết bằng tiếng Việt không dấu**.\[21\] Người nhận không phải khách của VietinBank.\[21\]

**#3.4 – Các mẫu SMS khác đã được báo đăng:**
- Tuổi Trẻ (2/6/2021): **[NV]** "Tài khoản của quý khách hiện tại đang bị khóa, đề nghị đăng nhập đường link để xác thực hôm nay" – https://tuoitre.vn/ngan-hang-canh-bao-cac-tin-nhan-gia-mao-lua-tien-bung-phat-cung-dich-covid-19-20210602201645521.htm \[23\]
- VOV2 (nạn nhân Phương Linh, Mỹ Đình): **[NV]** "Tài khoản của quý khách đã đăng nhập ở một thiết bị khác. Nếu không phải bạn, vui lòng đăng nhập vào đường link để xác thực, tránh bị chiếm dụng tài khoản" – https://vov2.vov.vn/doi-song-xa-hoi/canh-giac-cac-chieu-thuc-lua-dao-mao-danh-ngan-hang-49651.vov2 \[24\]
- Công an Ninh Bình (CafeBiz, 6/4/2026), đầu số 092, 056: **[NV]** "Ngân hàng Vietcombank kính gửi quý khách, 11324 điểm Vietcom Priority sắp hết hạn." – https://cafebiz.vn/cong-an-thong-bao-quan-trong-toi-tat-ca-nhung-ai-nhan-duoc-tin-nhan-co-noi-dung-sau-176260406233427005.chn \[25\]
- *Thủ thuật:* sợ mất (khóa tài khoản, đăng nhập lạ) và tiếc của ("điểm sắp hết hạn"); khẩn cấp ("hôm nay").\[25\]\[26\]

**#3.5 – VTV (12/12/2024), "Mất 100 triệu đồng vì sập bẫy 'nâng hạn mức tín dụng'"** – https://vtv.vn/kinh-te/mat-100-trieu-dong-vi-sap-bay-nang-han-muc-tin-dung-20241212124423325.htm
- NN kể: **[NV]** "Họ yêu cầu em đọc 4 số cuối của thẻ tín dụng để nâng hạn mức. Sau đó, họ có bảo có mã OTP gửi về máy, gửi lại cho họ và sau đó thẻ của em đã bị trừ số tiền là 95 triệu đồng"\[27\]
- Vụ tương tự (CAND, 26/10/2023): chị Lan Anh (Nam Từ Liêm) mất 95.159.000 đồng sau khi được hứa voucher mua sắm\[28\] – https://cand.vn/ban-tin-113/mat-gan-100-trieu-dong-vi-chieu-huong-dan-nang-han-muc-the-tin-dung-i711812/
- Thanh Niên (16/3/2024): ca sĩ Lương Gia Huy mất tổng 450 triệu sau cuộc gọi "nâng hạn mức"\[29\] – https://thanhnien.vn/mat-gan-nua-ti-dong-trong-tich-tac-va-bai-hoc-can-thuoc-long-ve-ma-otp-185240316155443789.htm
- *Thủ thuật:* lòng tham nhẹ (hạn mức cao, voucher); xin dần từng mảnh thông tin (4 số cuối → OTP), tức là leo thang cam kết.

**Kết luận dạng 3:** Có 8 mẫu SMS nguyên văn (trong đó 3 mẫu không dấu) và 3 lời kể về cuộc gọi. Đây là dạng **giàu dữ liệu text nhất**, phù hợp cho bộ phân loại SMS. Chưa tìm được hội thoại chat dài vì kênh chính là SMS một chiều và cuộc gọi.

---

## 4. Giả danh sếp / lãnh đạo / đồng nghiệp (BEC/chat compromise)

**Đặc điểm chung:** Kẻ gian dùng tài khoản Zalo hoặc Facebook bị hack của lãnh đạo, hoặc lập tài khoản giả bằng ảnh lấy từ cổng thông tin cơ quan.\[30\]\[31\] Mở bằng câu xã giao, rồi "nhờ chút việc", vay số tiền tròn và hứa trả trong ngày.\[1\] Biến thể tinh vi hơn: chuyển tiền thật cho nhân viên trước, rồi yêu cầu chuyển tiếp qua QR "tiệm vàng".\[32\]

**#4.1 – VietnamNet (12/12/2023), "Thủ đoạn mạo danh sếp hỏi mượn tiền hàng loạt cấp dưới, người thân"** – https://vietnamnet.vn/thu-doan-mao-danh-sep-hoi-muon-tien-hang-loat-cap-duoi-nguoi-than-2225753.html
1. KLĐ (Facebook giả nhà báo Nguyễn Hưng): **[NV]** "Đang làm gì vậy"\[1\]
2. KLĐ: **[DG]** nói đang rất vội; **[NV]** "anh nhờ chút việc"\[1\]
3. Ông T.D. (biết là lừa, giả vờ hợp tác): **[NV]** "Vâng anh. Anh có gì chỉ đạo"\[1\]
4. KLĐ: **[NV]** "Tài khoản em còn tiền không, chuyển anh mượn 12 triệu, tối anh gửi lại"\[1\]
5. KLĐ (không chờ trả lời): gửi STK 1043136846, Vietcombank, chủ tài khoản Nguyễn Văn Hưng (trùng tên người bị mạo danh).\[1\]
6. Ông T.D.: **[NV]** "Em gửi luôn" … "anh nhận được chưa. Anh nhớ chuyển lại cho em đúng lời hứa nhé"\[1\]
7. **[DG]** KLĐ im lặng, từ chối video call và chặn tài khoản.\[1\]
- Cùng bài: Đặng Văn Thực và Đặng Thanh Tùng (bị tạm giữ ngày 29/10/2023) lấy số điện thoại lãnh đạo trên cổng thông tin để lập Zalo giả; lừa một cán bộ cấp dưới 30 triệu.\[1\]
- *Thủ thuật:* uy quyền và quan hệ thứ bậc (cấp dưới khó từ chối); khẩn cấp; tài khoản ngân hàng **trùng tên** để vượt bước kiểm tra tên người nhận; né xác minh bằng video.\[1\]

**#4.2 – Tuổi Trẻ (14/11/2026), "Hai phó giám đốc sở ở Khánh Hòa bị hack Zalo, mạo danh nhắn tin mượn tiền"** – https://tuoitre.vn/hai-pho-giam-doc-so-o-khanh-hoa-bi-hack-zalo-mao-danh-nhan-tin-muon-tien-100261114213719946.htm
- KLĐ (từ Zalo thật của phó giám đốc sở): **[NV]** "Tài khoản còn đủ 30 triệu k0 (không) cho mượn chuyển vào số này có tí việc."\[5\]
- Dân Trí đăng cùng vụ với câu chữ khác: **[NV]** "Anh còn đủ 30 triệu không, cho em mượn chuyển qua số này có tý việc." – https://dantri.com.vn/phap-luat/hai-pho-giam-doc-so-bi-hack-zalo-nhan-muon-tien-nhieu-nguoi-20261115110520323.htm \[33\]
- **[DG]** Tài khoản bị chiếm sau khi chủ nhân bấm link "bình chọn cho con gái" do một tài khoản đã bị hack trước đó gửi tới. Tin nhắn hẹn trả vào sáng hôm sau.\[33\]\[34\]\[35\]
- *Ghi chú dữ liệu:* hai báo chép khác nhau ("k0"/"ko"/"không", "tí"/"tý").\[5\]\[36\] Nên lưu cả hai biến thể và ghi nguồn; đây chính là dạng nhiễu chính tả có thật.

**#4.3 – Công an tỉnh Phú Thọ (31/10/2026; Kenh14, CafeF dẫn lại)** – https://kenh14.vn/cong-an-thong-bao-toi-tat-ca-nhung-ai-nhan-duoc-tin-nhan-zalo-co-noi-dung-sau-215261102233031626.chn
- **[DG]** "Lãnh đạo" (Zalo bị chiếm) nhắn nhân viên nhờ tạm ứng 50 triệu mua quà tặng người thân. Lãnh đạo thật cũng bị lừa nên chuyển tiền thật cho nhân viên. Sau đó kẻ gian gửi mã QR mang tên một "cửa hàng vàng bạc" và yêu cầu chuyển toàn bộ số tiền vừa nhận.\[32\]\[37\]
- *Thủ thuật:* dùng giao dịch tiền thật để tạo lòng tin; bắt đầu bằng trao đổi công việc thông thường.\[32\]\[37\]

**#4.4 – Tham khảo nước ngoài (Trung Quốc, CafeF 2/7/2024)** – https://cafef.vn/nghe-loi-sep-chuyen-tien-cho-doi-tac-nu-ke-toan-khien-tai-khoan-cong-ty-bay-mau-45-ty-dong-7-doi-tuong-lua-dao-bi-canh-sat-bat-giu-188240702142024263.chn
- **[DG]** Nữ kế toán bị kéo vào nhóm chat có "sếp Vương" giả. Kẻ gian gửi ảnh giao dịch giả (đối tác chuyển 360.000 NDT), rồi yêu cầu chuyển 1,29 triệu NDT (hơn 4,5 tỷ đồng) với ghi chú "việc gấp, không cần thủ tục rườm rà". Sếp thật: **[NV, bản dịch]** "Em nói gì cơ, 360.000 NDT nào? Công ty mình làm gì có đối tác nào như thế?"\[38\]
- *Lưu ý:* đây là vụ ở Trung Quốc, bản dịch qua báo Việt, **không** phải dữ liệu Việt Nam. Chỉ dùng tham khảo kịch bản BEC kiểu "nhóm chat + kế toán".

**Kết luận dạng 4:** Có 1 đoạn đa lượt tốt (#4.1), 1 tin nhắn nguyên văn có lỗi chính tả thật (#4.2) và 1 kịch bản do công an mô tả. Chưa tìm thấy vụ BEC doanh nghiệp Việt Nam nào được đăng kèm nguyên văn chat với kế toán.

---

## 5. Việc nhẹ lương cao / làm nhiệm vụ / CTV online

**Đặc điểm chung:** Nạn nhân bị "lùa" vào nhóm Telegram hoặc Zalo, hoặc được mời qua quảng cáo.\[39\]\[40\] Nhiệm vụ đầu không mất tiền (thả tim, follow), được trả 10.000–55.000đ.\[40\]\[41\] Sau đó chuyển sang "đặt cọc" theo bậc, hoa hồng 20–40%, trả đủ ở các vòng nhỏ.\[39\]\[40\] Đến mức lớn thì "sai lệnh", "chưa hoàn thành chuỗi", "quá 30 phút", buộc nạp thêm mới rút được.\[42\]\[43\] Trong nhóm có nhiều tài khoản chim mồi khoe bill.\[39\]\[44\]

**#5.1 – Thanh Niên (17/10/2023), "Hàng trăm người bỗng dưng bị 'lùa' vào nhóm 'việc nhẹ lương cao'"** – https://thanhnien.vn/hang-tram-nguoi-bong-dung-bi-lua-vao-nhom-viec-nhe-luong-cao-185231017185710442.htm
1. Thành viên bị thêm vào nhóm Telegram gần 150 người: **[NV]** "Cái nhóm gì vậy", "Ai cho vào đây", "Đang ngủ trưa cũng không yên"\[39\]
2. KLĐ ("Minh Hằng TVV"): **[NV]** "Xin chào tất cả các thành viên tham gia vào nhóm hôm nay, các bạn là những thành viên may mắn có thể tham gia sự kiện của chúng tôi. Đây là sự kiện khuyến mãi đặc biệt của Tiki, mọi người bỏ chút thời gian quan tâm sẽ có nhiều ưu đãi hấp dẫn dành cho các bạn tại nhóm nhé!"\[39\]
3. Thành viên: **[NV]** "Sự kiện gì vậy", "Nhận quà gì thế", "là được tiền hay sao", "có mất phí không"\[39\]
4. KLĐ: **[NV]** "Các thành viên may mắn tại nhóm có thể theo dõi và tham gia các hoạt động của chúng tôi để nhận về tài khoản lên tới 700.000 đồng mỗi ngày từ việc tham gia sự kiện tháng 10 của Tiki"\[39\]
5. KLĐ: **[NV]** " Các bạn tham gia sẽ không mất bất kỳ khoản phí nào"\[39\]
6. KLĐ: **[DG]** bấm link TikTok, thả tim, chụp màn hình gửi lại, nhận 55.000đ.\[39\]
7. Nhóm "Nhiệm vụ Lotte và Tiki": **[DG]** bảng giá đặt cọc 90.000 → nhận 108.000; 230.000 → 276.000; 1,25 triệu → 1,5 triệu; cao nhất 79 triệu → 94,8 triệu. Khẩu hiệu **[NV]** "Nạp tiền xong sẽ nhận ngay hoa hồng"; hứa "ngân hàng sẽ bồi thường 100%… trong vòng 7 ngày".\[39\]
8. Nạn nhân Huỳnh Mi (Đà Nẵng): **[DG]** trong khoảng 7 ngày được trả đủ, sau đó nạp gần 120 triệu thì bị đòi thêm 120 triệu trong 30 phút mới "hoàn thành nhiệm vụ"; mất gần 120 triệu.\[39\]
- *Thủ thuật:* "người may mắn" (tâm lý được chọn); "không mất phí" ở vòng đầu; bằng chứng xã hội (chim mồi khoe bill); mồi lãi nhỏ rồi leo thang theo bậc; hạn chót 30 phút; hiệu ứng chi phí chìm (phải nạp thêm để cứu tiền cũ).

**#5.2 – Thanh Niên (16/4/2023), "Nhiều người vẫn 'sập bẫy' lừa đảo trên Telegram, Facebook, Zalo..."** – https://thanhnien.vn/nhieu-nguoi-van-sap-bay-lua-dao-tren-telegram-facebook-zalo-185230414150936028.htm
- **[DG]** Phóng viên đóng vai, nạp 68.000 nhận 90.000, sau đó bị yêu cầu nạp 779.000. Khi xin rút 260.000 thì bị từ chối vì "phải hoàn thành nhiệm vụ mới rút được tiền".\[45\]
- KLĐ ("Hy Cuti", gửi kèm ảnh giấy đăng ký kinh doanh): **[NV]** "Mượn tạm ai rồi hoàn thành đơn này và đơn nữa thì chị hỗ trợ làm để rút tiền về"\[45\]
- KLĐ: **[NV]** "21 giờ hệ thống ngưng hoạt động không ai giải quyết"\[45\]
- Nạn nhân T.V. (nhóm "TX_GROUP_KT"): **[NV]** "Vì có thông báo trúng thưởng nên tôi không được lấy tiền vốn và hoa hồng ở nhiệm vụ trước đó... Bắt buộc tôi phải nộp vào 44 triệu đồng để kích hoạt mã nhận thưởng..."; sau đó web báo "nhập sai yêu cầu".\[45\]
- *Thủ thuật:* xúi vay mượn để nạp; giấy tờ giả; hạn chót theo giờ; biến "trúng thưởng" thành rào cản rút tiền.

**#5.3 – Tuổi Trẻ (30/8/2023), "Bẫy tuyển dụng online lừa đảo người tìm việc – Kỳ 2: Chiêu trò lừa đảo trên Telegram"** – https://tuoitre.vn/bay-tuyen-dung-online-lua-dao-nguoi-tim-viec-ky-2-chieu-tro-lua-dao-tren-telegram-2023083010523942.htm
- Nhóm KLĐ: **[NV]** "Làm nhiệm vụ là trách nhiệm của mỗi ứng viên, để đánh giá thái độ, sự nhiệt tình giúp công ty tạo ra giá trị"\[42\]
- Nhóm KLĐ: **[NV]** "Mức đóng tiền lớn, số tiền hoàn lại càng cao"\[42\]
- Nhóm KLĐ (sau lần nạp thứ 3): **[NV]** "Vì bạn đã nạp sai lệnh, nên mất tiền và muốn lấy lại phải nạp thêm, nếu không sẽ mời ra khỏi nhóm"\[42\]
- Tài khoản chim mồi: **[NV]** "Tớ đã nhận lại tiền, vừa nhận tháng lương đầu tiên, lương khá lắm"\[42\]
- Chim mồi nhắn riêng: **[NV]** "Cứ yên tâm đi, chị nhà bác tớ đang làm cho công ty này. Chị ấy bảo cứ làm theo các anh ấy, không lo gì đâu. Có vấn đề gì chị ấy chịu trách nhiệm"\[42\]
- *Thủ thuật:* đóng khung lừa đảo thành "thử thách tuyển dụng"; lỗi giả ("nạp sai lệnh"); đe dọa loại khỏi nhóm; bằng chứng xã hội có dàn dựng.

**#5.4 – Người Lao Động (qua Tuổi Trẻ, 11/1/2024), "Bẫy 'việc nhẹ lương cao' ngày càng tinh vi"** – https://tuoitre.vn/nld/bay-viec-nhe-luong-cao-ngay-cang-tinh-vi-196240111210255792.htm
- **[DG]** Phóng viên được giới thiệu gói "mức 1 nạp 880.000 đồng sẽ được nhận hoa hồng 308.000 đồng, mức 2 nạp 1.260.000 đồng thì hoa hồng sẽ là 441.000 đồng". Trong nhóm có cảnh "kẻ tung người hứng". Một nạn nhân mất hơn 25 tỉ.\[46\]

**Kết luận dạng 5:** Đây là dạng có nhiều câu nguyên văn nhất (khoảng 15 câu từ 3 bài), đủ dựng 2–3 kịch bản đa lượt có nguồn. Tín hiệu mạnh cho mô hình: các cụm "nạp sai lệnh", "hoàn thành nhiệm vụ mới rút được", "hoa hồng", bảng giá theo bậc, và việc bị thêm vào nhóm khi chưa đồng ý.

---

## 6. Đầu tư cam kết lãi cao (chứng khoán, forex, tiền ảo; "thầy", "trợ lý", app giả)

**Đặc điểm chung:** Kẻ gian gọi điện hoặc nhắn tin, xưng nhân viên công ty chứng khoán (SSI, "Hòa Bình"…), mời vào nhóm Zalo rồi chuyển sang Telegram hoặc "room VIP".\[47\]\[48\] "Thầy" phím hàng, nhóm ngập tin khoe lãi, rồi dẫn sang app hoặc sàn riêng.\[48\]\[49\] Nạn nhân được rút thử khoản nhỏ, sau đó bị khóa và đòi "phí quản lý lợi nhuận", "thuế" để rút.\[47\]\[50\]

**#6.1 – Tuổi Trẻ (3/3/2023), "Đầu tư chứng khoán: Bị lừa tiền tỉ bởi 'thầy' online"** – https://tuoitre.vn/dau-tu-chung-khoan-bi-lua-tien-ti-boi-thay-online-20230303080336959.htm
- Trưởng nhóm Zalo: **[NV]** "cổ phiếu hôm nay mua vào bây giờ hãy bán ra toàn bộ, chốt lời ngay lập tức"\[48\]
- "Ngọc Ánh" (xưng Công ty CP chứng khoán Hòa Bình): **[NV]** "Em là Ngọc Ánh gọi cho mình, bên Công ty CP chứng khoán Hòa Bình" … "đầu tư vốn càng lớn, lợi nhuận càng cao" … "Việc đầu tư này hoàn toàn không có rủi ro, bên em bù lỗ"\[48\]
- Điều khoản "hợp đồng" gửi qua Zalo: **[NV]** "khi cung cấp dịch vụ cho khách hàng, bên A (CTCK) chỉ được sử dụng phần mềm giao dịch Zalo, Telegram, Facebook và thông báo cuộc gọi, không được cung cấp dịch vụ bằng hình thức khác"\[48\]
- **[DG]** Nạn nhân N.X.Sơn bị "thầy" Tony Nguyễn và trợ lý dẫn sang app VietDiamondStock. Muốn rút thì "phải thoát khỏi nhóm Zalo". Bị đòi phí 30% trước khi rút. Theo nạn nhân, nhóm 100 người có tới 80 người là chim mồi.\[48\]\[51\]
- *Lưu ý:* lời "Ngọc Ánh" có thể là cuộc gọi chứ không phải tin nhắn; bài báo không nói rõ.
- *Thủ thuật:* lòng tham (bao lỗ, lãi lớn); bằng chứng giả ("hợp đồng"); bằng chứng xã hội (chim mồi); mồi rút tiền nhỏ; ép rời khỏi nhóm để cô lập.

**#6.2 – Tuổi Trẻ (20/12/2024), "Chào mời ngày đêm, 'thầy' chứng khoán online hứa 'phím' cổ phiếu rồi tặng cả tiền"** – https://tuoitre.vn/chao-moi-ngay-dem-thay-chung-khoan-online-hua-phim-co-phieu-roi-tang-ca-tien-20241219213329292.htm
- **[DG]** Chị Nguyên Thúy (34 tuổi, Hà Nội) nhận cuộc gọi từ "nhân viên công ty chứng khoán S…", được đưa vào nhóm Zalo rồi Telegram cả trăm người. "Thầy" Q. hứa phím cổ phiếu tăng gấp đôi và "cam kết nhân đôi, nhân ba tài khoản". Một "trợ lý" thúc đăng ký lớp học. Thành viên được hứa quà 200.000–500.000đ tiền cước điện thoại để "đền bù" thị trường ảm đạm. Khi chị đòi xem chứng chỉ thì bị kích khỏi nhóm. SSI phát hiện tài khoản Zalo "Nguyễn Duy Hưng" mạo danh lãnh đạo công ty.\[52\]
- *Thủ thuật:* chuyên gia giả; quà nhỏ để kích hoạt cơ chế "có qua có lại"; thúc giục qua vai trợ lý.

**#6.3 – Thanh Niên (19/9/2024), "Ma trận đầu tư chứng khoán, tiền ảo bủa vây người dân"** – https://thanhnien.vn/ma-tran-dau-tu-chung-khoan-tien-ao-bua-vay-nguoi-dan-185240918224152162.htm
- Telesale (qua điện thoại): **[NV]** "Công ty tụi em cam kết đầu tư sẽ có lợi nhuận 10% mỗi tháng và nếu có lỗ thì công ty sẽ chịu 100%, khách hàng vẫn nhận được tiền lãi đều đặn"\[47\]
- **[DG]** Tên nhóm: "Tư vấn siêu cổ tăng trưởng 2024", "Nhóm VIP lướt sóng", "Room VIP: khuyến nghị tư vấn mua cổ phiếu". Nạn nhân D.T.H. (nhóm "Chia sẻ giao lưu Quỹ SeQuoia Capital VN", app "Smart SQV") mất 14 tỉ, bị đòi 1,6 tỉ "phí quản lý lợi nhuận" và 332 triệu "thuế thu nhập cá nhân".\[47\]

**#6.4 – Bối cảnh quy mô:**
- Tuổi Trẻ (11/12/2024) gọi đường dây Mr Pips (Phó Đức Nam) là "lớn nhất Việt Nam về ngoại hối chứng khoán".
- Dân Trí (11/12/2024) dẫn Công an quận Cầu Giấy, Hà Nội: "bộ máy của Nam có hơn 1.900 nhân viên", dùng Zalo, Telegram, Viber.
- Theo VTV (4/7/2026), kết luận điều tra bổ sung xác định số tiền chiếm đoạt là hơn 1.568 tỷ đồng. Con số "ước tính hơn 5.200 tỷ đồng" là tài sản bị thu giữ, phong tỏa.

**Kết luận dạng 6:** Có khoảng 7 câu nguyên văn và 3 kịch bản diễn giải chi tiết. Không bài nào đăng đoạn chat liền mạch giữa "thầy"/"trợ lý" và nạn nhân bằng văn bản; dữ liệu thật nằm trong ảnh chụp.

---

## 7. Trúng thưởng, nhận quà, bưu phẩm từ nước ngoài, đóng phí/thuế

**Đặc điểm chung:** Thông báo trúng thưởng lớn (SH, iPhone, tiền mặt) qua Messenger, SMS hoặc Zalo, kèm mã số trúng thưởng và website lạ.\[7\]\[53\] Sau đó đòi "phí hồ sơ", "thuế 10%", "phí vận chuyển", trả bằng thẻ cào hoặc chuyển khoản, và đòi thêm sau mỗi lần nộp.\[54\]\[55\] Nhánh "quà nước ngoài" do kẻ gian đóng vai nhân viên sân bay hoặc hải quan gọi điện.\[56\]\[57\]\[58\]\[59\]

**#7.1 – Cục An toàn thông tin khuyến cáo (qua Báo Đắk Lắk, 26/7/2018)** – https://baodaklak.vn/channel/3485/201807/canh-giac-voi-cac-thu-doan-lua-dao-trung-thuong-qua-tin-nhan-5590769/
- KLĐ (Messenger) → anh M.: **[NV]** "Tài khoản messenger của bạn mang mã số trúng thưởng là “402E79” đã may mắn được vòng quay lựa chọn ngẫu nhiên, xác nhận là tài khoản đã trúng thưởng"\[60\]
- **[DG]** Giải gồm xe Honda SH 150i, phiếu quà 200 triệu, phiếu xăng 1 năm.\[60\]\[61\]
- KLĐ: **[NV]** "Truy cập vào website: “GiaiThuongFB552.Com” hoặc liên hệ số điện thoại chăm sóc khách hàng để đăng ký làm thủ tục hồ sơ nhận thưởng" … "tin nhắn này thay cho giấy thông báo trực tiếp từ tập đoàn"\[60\]
- *Thủ thuật:* lòng tham; mượn uy tín (Facebook, Honda); mã số giả để tạo cảm giác chính thức.

**#7.2 – Thanh Niên, "Nhận tin nhắn trúng thưởng từ Facebook, chủ nhân bị lừa hàng chục triệu đồng"** – https://thanhnien.vn/nhan-tin-nhan-trung-thuong-tu-facebook-chu-nhan-bi-lua-hang-chuc-trieu-dong-185700021.htm
- KLĐ (tài khoản "Thông Tin Mạng"): **[NV]** "Facebook thông báo. Xin chúc mừng tài khoản messenger của bạn đã may mắn nhận được giải nhất từ sự kiện Tuần lễ vàng tri ân khách hàng quý 3.2017"\[54\]
- NN kể: **[NV]** "Mình nghĩ số mình may mắn thật nên liên hệ để… nhận giải thưởng. Giọng một phụ nữ nói với mình để nhận giải thưởng cần nộp tiền bằng hình thức mua thẻ cào điện thoại để làm hồ sơ. Bên cạnh đó là chi 10% tổng giá trị giải thưởng để nộp trước, đó là tiền thuế, sau đó mới được nhận quà."\[54\]

**#7.3 – Znews/PLO (nhóm lừa ở Đà Nẵng, quê Duy Xuyên, Quảng Nam)** – https://znews.vn/bat-nhom-lua-dao-chuc-mung-ban-trung-thuong-xe-sh-post600548.html
- KLĐ: **[NV]** "Xin chúc mừng, tài khoản của bạn đã nhận được phần thưởng là một chiếc xe máy SH và 35 triệu đồng tiền mặt" (phí dịch vụ trả bằng thẻ cào; nhóm mua website lừa giá 250.000–300.000đ/trang).\[62\]\[63\]\[64\]

**#7.4 – VietnamNet, "Kiếm tiền tỷ bằng lừa đảo tin nhắn trúng thưởng" (Công an Thanh Hóa)** – https://vietnamnet.vn/kiem-tien-ty-bang-lua-dao-tin-nhan-trung-thuong-614492.html
- **[DG]** Chị Phương gọi hotline. Lần 1 chuyển 5 triệu "phí"; Võ Văn Tuấn Kiệt gọi đòi thêm 34,8 triệu "phí vận chuyển" và 73,1 triệu "thuế VAT" cho chiếc xe. Kẻ khác đòi 50 triệu "phí" để nhận 250 triệu.\[55\]
- *Thủ thuật:* leo thang từng khoản phí; mỗi lần có tên gọi "hợp pháp" (VAT, vận chuyển).

**#7.5 – Mẫu mới (11/2026), Công an TP Bắc Ninh** – https://giadinh.suckhoedoisong.vn/cong-an-phat-thong-bao-quan-trong-den-nhung-ai-nhan-duoc-tin-nhan-sms-zalo-facebook-email-co-noi-dung-nay-17226112300563863.htm
- **[NV]** "Chúc mừng bạn đã may mắn trở thành khách hàng may mắn trúng 01 chiếc iPhone 18…" + link; sau đó đòi phí ship, thuế TNCN, phí hồ sơ, bảo hiểm đơn hàng.\[65\]\[66\]
- Công an tỉnh Phú Thọ (11/2026) mô tả kịch bản 3 bước: tặng quà thật → báo trúng giải 10–100 triệu → đòi phí hồ sơ 730.000–990.000đ "sẽ hoàn trả khi trao giải" → đòi thêm.\[67\]

**#7.6 – Quà/bưu phẩm từ nước ngoài, "nhân viên sân bay/hải quan"**
- VnExpress, "Giả mạo nhân viên sân bay lừa hành khách đóng phí hải quan" – https://vnexpress.net/phap-luat/gia-mao-nhan-vien-san-bay-lua-hanh-khach-dong-phi-hai-quan-3772473.html. **[DG]** Một phụ nữ ở Tây Ninh nộp hơn 37 triệu "phí hải quan", sau đó bị đòi thêm 6.500 USD vì "tài sản có giá trị cao". Đường dây nóng sân bay Nội Bài nhận 3–4 cuộc gọi phản ánh mỗi ngày.\[68\]
- Znews, "Bị lừa hơn 1 tỷ vì tin 'thùng quà từ Mỹ' của bạn trai nước ngoài" – https://znews.vn/bi-lua-hon-1-ty-vi-tin-thung-qua-tu-my-cua-ban-trai-nuoc-ngoai-post832949.html. **[DG]** Ngày 22/3 đòi 1.600 USD phí hải quan, rồi thêm 3.500 USD; chiều 23/3 nói thùng có 1,4 triệu USD và đòi 10.500 USD "lo hải quan"; cuối cùng đòi 50.000 USD tiền mặt.\[69\]
- *Thủ thuật:* leo thang cam kết; lòng tham (thùng tiền triệu đô); đe dọa pháp lý ("rửa tiền").\[70\]\[71\]

**Kết luận dạng 7:** Có khoảng 6 mẫu tin nguyên văn (chủ yếu là tin mở đầu) và 4 chuỗi leo thang phí có số liệu. Phần đòi phí gần như luôn qua **điện thoại**, nên không có văn bản.

---

## 8. Lừa đảo tình cảm (romance scam: lính Mỹ, bác sĩ, "ca sĩ", đầu tư chung)

**Đặc điểm chung:** Kẻ gian nhắm người sống một mình hoặc trung niên, xưng là người nước ngoài thành đạt (lính Mỹ ở Iraq hay vùng Vịnh, bác sĩ Liên Hợp Quốc) hoặc người nổi tiếng.\[7\]\[50\]\[57\]\[59\]\[72\]\[73\] Tình cảm được đẩy rất nhanh ("vợ yêu", hứa cưới), sau đó là "gửi quà" kèm phí hải quan, hoặc dẫn sang "đầu tư chung" trên sàn tiền ảo.\[50\]\[74\]\[75\]\[76\] Kẻ gian tránh gọi video và tách nạn nhân khỏi người thân.

**#8.1 – VnExpress (23/11/2026), "Ba tiếng ngăn người phụ nữ 66 tuổi chuyển tiền cho 'bạn trai ca sĩ'"** – https://vnexpress.net/ba-tieng-ngan-nguoi-phu-nu-66-tuoi-chuyen-tien-cho-ban-trai-ca-si-5147974.html
1. KLĐ: **[DG]** chủ động tán tỉnh người phụ nữ sống đơn thân, gửi ảnh thân mật, hứa vài tháng nữa về Việt Nam cưới, "chia\[3\] ngọt sẻ bùi". Thực tế mới trò chuyện khoảng 1 tuần; tài khoản mới lập 1 ngày.
2. KLĐ: **[DG]** báo đã gửi "món quà quan trọng", yêu cầu chuyển trước 5 triệu phí vận chuyển vào tài khoản mang tên Nguyễn Thị Hoa; liên tục gửi ảnh và video kiện hàng lên máy bay.
3. NN (với công an): **[NV]** món quà là "đồ quan trọng, không thể tiết lộ", "không phải ma túy nên chẳng có gì phải lo, cứ chuyển tiền giúp"
4. NN gọi điện; KLĐ nói "xin chào", im lặng khoảng 30 giây rồi tắt máy và chuyển sang nhắn tin.
5. KLĐ: **[NV]** "Anh yêu, nhắn tin cho em nhé, em không thể gọi điện thoại bây giờ được, chồng yêu dấu của em"\[3\]
6. KLĐ (vài giây sau, sửa xưng hô): **[NV]** "Em yêu, nhắn tin cho anh nhé em yêu"
7. NN (theo hướng dẫn của công an): **[NV]** "Anh yêu ơi, em đang ở Công an xã Hương Sơn, tỉnh Hà Tĩnh, anh nghe cuộc gọi video của em đi"\[3\]
8. KLĐ: **[DG]** hỏi tại sao bà đến đó, khuyên "vợ yêu" về nhà.\[3\] **[NV]** "Em đã về nhà chưa, vợ yêu dấu của anh"; dặn bà không được đi đâu; từ chối gọi video.
- *Thủ thuật:* thao túng cảm xúc (gọi "vợ yêu", hứa cưới); bằng chứng giả (video kiện hàng); **cô lập** ("về nhà", không đi đâu); né xác minh (không video). **Dấu hiệu nhận diện cho NLP:** nhầm giới tính trong xưng hô ("chồng yêu dấu của em" từ người tự nhận là đàn ông), cho thấy một người vận hành nhiều kịch bản cùng lúc.

**#8.2 – CAND (2/5/2020), "'Người lính Mỹ ở vùng Vịnh' và những cú lừa ngoạn mục"** – https://cand.vn/nguoi-linh-my-o-vung-vinh-va-nhung-cu-lua-ngoan-muc-post564319.html
- **[DG]** "John", tự nhận là lính Mỹ ở vùng Vịnh, kể chán chiến tranh, muốn sống bên một người vợ ở Việt Nam, mua nhà và tính chuyện lâu dài. Sau đó báo gửi quà. Một "nhân viên hải quan" nữ đòi 15 triệu phí vận chuyển, rồi đòi thêm phí "để tránh bị xử lý về hành vi rửa tiền" vì trong quà có tiền mặt. Đường dây Nguyễn Thị Chanh Em và Domoraud Chales-Romain (quốc tịch Ghi-nê) thu thập thông tin khoảng 56 nạn nhân; 4 tài khoản nhận hơn 2,2 tỷ.\[74\]
- *Thủ thuật:* nhắm người cô đơn (nữ công nhân ngoài 30, sống trọ); dựng tương lai chung; chia vai (người yêu và hải quan).\[74\]

**#8.3 – Người Lao Động (11/3/2021), "Tin lời 'bác sĩ Liên Hiệp Quốc', quý bà ở TP HCM mất gần 27.000 USD"** – https://nld.com.vn/phap-luat/quy-ba-o-quan-6-mat-gan-27000-usd-vi-tin-loi-bac-si-lien-hiep-quoc-20210311114045536.htm
- **[DG]** Email từ "công ty vận chuyển": ngày 8/9/2020 báo có kiện hàng; hai ngày sau đòi 6.945 USD phí hải quan; ngày 17/9/2020 đòi tiếp 13.733 USD; thêm 5.989 USD.

**#8.4 – Biến thể "tình cảm + đầu tư" (pig-butchering)**
- VnExpress (2/4/2025), "Mất 9 tỷ đồng vì tin lời 'bạn trai trên mạng' đầu tư tiền ảo" – https://vnexpress.net/mat-9-ty-dong-vi-tin-loi-ban-trai-tren-mang-dau-tu-tien-ao-4869247.html. **[DG]** Người phụ nữ 44 tuổi (Hà Đông) đầu tư nhỏ, thấy lãi và rút được nên "tất tay". Ngày 25/3, lãi ảo hiện 19 tỷ nhưng hệ thống đòi nộp 5% (khoảng 1 tỷ) mới cho rút. Tổng thiệt hại khoảng 9 tỷ.
- VnExpress, "Bị lừa 3,4 tỷ đồng khi đầu tư cùng người yêu trên mạng" – https://vnexpress.net/bi-lua-3-4-ty-dong-khi-dau-tu-cung-nguoi-yeu-tren-mang-4801231.html. **[DG]** Ông Vũ, 62 tuổi (Tây Ninh), chuyển khoản 14 lần, tổng 3,4 tỷ. Theo CAND, kẻ gian bảo nạn nhân rút tiền từ sàn OKX sang "UTSpeed" với lãi 3–4%/ngày.
- *Thủ thuật:* tình cảm làm nền cho lòng tin; mồi rút tiền nhỏ; "phí rút tiền" theo % lãi ảo.

**Kết luận dạng 8:** Có 1 đoạn đa lượt nguyên văn rất giá trị (#8.1) và 4 kịch bản có số liệu. Thiếu nguyên văn các tin "tán tỉnh" kiểu "my love"/"honey" trong phần chữ báo chí; chúng chỉ có trong ảnh.

---

## Recommendations (cho đội làm dataset)

1. **Tách 3 tầng dữ liệu và gán nhãn rõ**:
   - (a) *Gold-verbatim*: các câu [NV] ở trên, kèm URL, ngày đăng và người gửi.
   - (b) *OCR từ ảnh chụp màn hình* trong chính các bài báo này. Đây là nguồn duy nhất có hội thoại 5–15 tin, teencode và emoji thật. Nên dùng OCR tiếng Việt rồi soát tay.
   - (c) *Synthetic*: sinh dữ liệu tổng hợp từ các kịch bản [DG]. Không trộn tầng (c) vào tập test.
2. **Schema nhãn đề xuất**:
   - Mỗi tin nhắn: `scam_type` (8 lớp + "hợp lệ"), `speaker` (scammer/victim/shill/bystander), `channel` (SMS/Zalo/Messenger/Telegram/call-transcript).
   - Đa nhãn thủ thuật: `urgency`, `authority`, `threat`, `secrecy_isolation`, `greed`, `fake_proof`, `bait_small_win`, `escalation`, `emotional_manip`, `impersonation_known`, `fee_to_withdraw`.
   - `stage` (tiếp cận → tạo tin → yêu cầu tiền → leo thang → cắt liên lạc). Nhãn này giúp cảnh báo **sớm**, trước bước chuyển tiền.
3. **Đặc trưng có giá trị cao rút ra từ dữ liệu thật**:
   - số tài khoản kèm tên người nhận khác người nhắn (hoặc trùng tên một cách đáng ngờ);
   - "giữ bí mật", "không được tắt máy";
   - hạn chót cụ thể ("bốn giờ chiều", "trong hai giờ", "30 phút");
   - "nạp sai lệnh", "hoàn thành nhiệm vụ mới rút được";
   - link + "xác thực" + "bị khóa";
   - từ chối gọi video;
   - xưng hô thân mật bất thường hoặc sai giới.
4. **Mẫu âm (hợp lệ) khó**: thêm SMS ngân hàng thật, tin vay tiền thật giữa người thân, và thông báo tuyển dụng thật, để mô hình không học vẹt từ "chuyển khoản".
5. **Nguồn mở rộng nên khai thác tiếp**:
   - cảnh báo hằng tuần của Cục An toàn thông tin;
   - fanpage Công an các tỉnh (thường đăng ảnh chat chưa che);
   - ChongLuaDao (theo Wikipedia, đầu 2023 có hơn 300.000 người dùng và đã hỗ trợ hơn 11.000 nạn nhân);
   - bài tường thuật tòa án (cáo trạng đôi khi trích nguyên văn tin nhắn).
6. **Pháp lý và đạo đức**: chỉ trích đoạn ngắn kèm ghi nguồn; che số tài khoản và tên người thật trước khi công bố dataset. Một số STK trong bài báo có thể thuộc người bị mượn danh tính.

## Caveats

- **Không đạt chỉ tiêu "3–5 đoạn × 5–15 tin/dạng" dưới dạng văn bản nguyên văn.** Đây là giới hạn của nguồn, không phải do bỏ sót. Số đoạn đa lượt có nguyên văn (từ 4 lượt trở lên): dạng 2 có 2 đoạn; dạng 4, 5 và 8 mỗi dạng có 1 đoạn; dạng 1, 3, 6, 7 chỉ có tin rời hoặc lời kể.
- **Teencode và không dấu:** phần chữ báo chí gần như luôn đã được biên tập lại có dấu. Không dấu thật chỉ thấy ở SMS giả ngân hàng (#3.1, #3.3) và một biến thể "k0" (#4.2).
- **Sai lệch giữa các báo** khi chép cùng một tin nhắn (#4.2). Nên ưu tiên ảnh gốc khi có.
- Một số trích dẫn lấy từ đoạn tóm tắt của kết quả tìm kiếm hoặc từ báo dẫn lại (Báo Lai Châu, Cafef, Znews #7.3, VietnamNet #7.4). Cần mở bài gốc để đối chiếu lần cuối trước khi đưa vào tập gold.
- Vụ #4.4 xảy ra ở Trung Quốc; chỉ dùng tham khảo kịch bản.
- Một số câu "nguyên văn" thực chất là lời nạn nhân **thuật lại** cuộc gọi (#2.1, #3.5, #6.1), không phải tin nhắn gõ. Nên gắn nhãn `channel=call-retold`.

## Nguồn

1. [Thủ đoạn mạo danh sếp hỏi mượn tiền hàng loạt cấp dưới, người thân](https://vietnamnet.vn/thu-doan-mao-danh-sep-hoi-muon-tien-hang-loat-cap-duoi-nguoi-than-2225753.html)
2. [Kẻ giả danh công an lộ mặt qua cuộc gọi video với người phụ nữ cao tay](https://vietnamnet.vn/gia-danh-cong-an-lo-mat-qua-cuoc-goi-clip-man-kich-lo-bich-bi-boc-tran-2425839.html)
3. [Ba tiếng ngăn người phụ nữ 66 tuổi chuyền tiền cho 'bạn trai ca sĩ' - Báo VnExpress](https://vnexpress.net/ba-tieng-ngan-nguoi-phu-nu-66-tuoi-chuyen-tien-cho-ban-trai-ca-si-5147974.html)
4. [Cảnh giác việc giả mạo ngân hàng, gửi tin nhắn lừa đảo](https://tuoitre.vn/plo/canh-giac-viec-gia-mao-ngan-hang-gui-tin-nhan-lua-dao-109701791.htm)
5. [Hai phó giám đốc sở ở Khánh Hòa bị hack Zalo, mạo danh nhắn tin mượn tiền - Tuổi Trẻ Online](https://tuoitre.vn/hai-pho-giam-doc-so-o-khanh-hoa-bi-hack-zalo-mao-danh-nhan-tin-muon-tien-100261114213719946.htm)
6. [Nhận tin nhắn vay tiền từ chính tài khoản người quen: Cẩn thận “bẫy” lừa đảo](https://soha.vn/nhan-tin-nhan-vay-tien-tu-chinh-tai-khoan-nguoi-quen-can-than-bay-lua-dao-198261008202021158.htm)
7. [Quân khu 2](https://quankhu2.vn/bai-2-nhan-dien-cac-hinh-thuc-lua-dao-pho-bien/)
8. [Cảnh giác với thủ đoạn mượn tiền qua tin nhắn facebook](https://baolaichau.vn/%E1%BB%91ng-k%C3%ADnh-ph%C3%B3ng-vi%C3%AAn/c%E1%BA%A3nh-gi%C3%A1c-v%E1%BB%9Bi-th%E1%BB%A7-%C4%91o%E1%BA%A1n-m%C6%B0%E1%BB%A3n-ti%E1%BB%81n-qua-tin-nh%E1%BA%AFn-facebook)
9. [Con tôi bị hack Messenger, hơn 80 học sinh mất tiền vì lừa đảo online](https://vnexpress.net/con-toi-bi-hack-messenger-hoc-sinh-mat-tien-lua-dao-online-5143954.html)
10. [Chiếm tài khoản Facebook để mạo danh vay tiền](https://vnexpress.net/chiem-tai-khoan-facebook-de-mao-danh-vay-tien-4062105.html)
11. [Chiếm tài khoản Facebook để mạo danh vay tiền](https://athena.edu.vn/chiem-tai-khoan-facebook-de-mao-danh-vay-tien/)
12. [Nhận tin nhắn vay tiền từ chính tài khoản người quen: Cẩn thận “bẫy” lừa đảo](https://hoahoctro.tienphong.vn/nhan-tin-nhan-vay-tien-tu-chinh-tai-khoan-nguoi-quen-can-than-bay-lua-dao-post1882799.tpo)
13. [Công an phát cảnh báo mới tới toàn dân: Tuyệt đối KHÔNG trả lời tin nhắn Zalo, Messenger của người thân, bạn bè nếu có nội dung sau](https://cafef.vn/toan-bo-nguoi-dan-luu-y-canh-bao-moi-tu-cong-an-tuyet-doi-khong-tra-loi-tin-nhan-zalo-messenger-cua-nguoi-than-ban-be-neu-co-noi-dung-sau-188261006110732621.chn)
14. [Từ dữ liệu lộ lọt, các đối tượng giả mạo người thân lừa đảo vay tiền](https://vtv.vn/tu-du-lieu-lo-lot-cac-doi-tuong-gia-mao-nguoi-than-lua-dao-vay-tien-100260627110008053.htm)
15. [Nhận tin nhắn vay tiền từ Zalo, Messenger của người thân cũng đừng vội chuyển khoản](https://home.vn/threads/nhan-tin-nhan-vay-tien-tu-zalo-messenger-cua-nguoi-than-cung-dung-voi-chuyen-khoan.62112/)
16. [Tin tức Giả danh công an cảnh sát, quân đội mới nhất hôm nay trên VnExpress](https://vnexpress.net/chu-de/gia-danh-cong-an-canh-sat-quan-doi-8180)
17. [Nhóm lừa đảo gửi lệnh bắt người, buộc nạn nhân chuyển 2 tỷ](https://znews.vn/nhom-lua-dao-gui-lenh-bat-nguoi-buoc-nan-nhan-chuyen-2-ty-post870259.html)
18. [Vợ chồng tìm mọi cách chuyển 700 triệu đồng cho kẻ lừa đảo - Báo VnExpress](https://vnexpress.net/vo-chong-tim-moi-cach-chuyen-700-trieu-dong-cho-ke-lua-dao-5148263.html)
19. [Nhận diện thủ đoạn giả công an gọi điện thoại lừa 'liên quan vụ án' - Báo VnExpress](https://vnexpress.net/cach-doc-vi-thu-doan-gia-cong-an-goi-dien-thoai-lua-lien-quan-vu-an-4852326.html)
20. [Cảnh báo hiện tượng lừa đảo qua tin nhắn giả danh ngân hàng](https://techcombank.com/thong-tin/thong-bao/canh-bao-hien-tuong-lua-dao-qua-tin-nhan-sms-gia-danh-ngan-hang)
21. [Tin nhắn mạo danh ngân hàng để lừa đảo dồn dập tấn công người dùng](https://vietnamnet.vn/ngo-ngang-vi-nhan-tin-nhan-lua-dao-doa-khoa-tai-khoan-ngan-hang-i289507.html)
22. [Cảnh giác thủ đoạn mạo danh ngân hàng gửi tin nhắn lừa đảo](https://tuoitre.vn/plo/canh-giac-thu-doan-mao-danh-ngan-hang-gui-tin-nhan-lua-dao-109664370.htm)
23. [Ngân hàng cảnh báo các tin nhắn giả mạo lừa tiền bùng phát cùng dịch COVID-19 - Tuổi Trẻ Online](https://tuoitre.vn/ngan-hang-canh-bao-cac-tin-nhan-gia-mao-lua-tien-bung-phat-cung-dich-covid-19-20210602201645521.htm)
24. [Cảnh giác các chiêu thức lừa đảo mạo danh ngân hàng](https://vov2.vov.vn/doi-song-xa-hoi/canh-giac-cac-chieu-thuc-lua-dao-mao-danh-ngan-hang-49651.vov2)
25. [Công an thông báo quan trọng tới tất cả những ai nhận được tin nhắn có nội dung sau](https://cafebiz.vn/cong-an-thong-bao-quan-trong-toi-tat-ca-nhung-ai-nhan-duoc-tin-nhan-co-noi-dung-sau-176260406233427005.chn)
26. [Cảnh giác thủ đoạn giả danh ngân hàng nhắn tin đổi điểm thưởng để chiếm đoạt tài sản](https://congan.quangngai.gov.vn/danh-muc-san-pham/-tin-tuc-su-kien/canh-giac-thu-doan-gia-danh-ngan-hang-nhan-tin-doi-diem-thuong-de-chiem-doat-tai-san.html)
27. [Mất 100 triệu đồng vì sập bẫy "nâng hạn mức tín dụng"](https://vtv.vn/kinh-te/mat-100-trieu-dong-vi-sap-bay-nang-han-muc-tin-dung-20241212124423325.htm)
28. [Mất gần 100 triệu đồng vì chiêu hướng dẫn "nâng hạn mức thẻ tín dụng"](https://cand.vn/ban-tin-113/mat-gan-100-trieu-dong-vi-chieu-huong-dan-nang-han-muc-the-tin-dung-i711812/)
29. [Mất gần nửa tỉ đồng trong tích tắc và bài học cần 'thuộc lòng' về mã OTP](https://thanhnien.vn/mat-gan-nua-ti-dong-trong-tich-tac-va-bai-hoc-can-thuoc-long-ve-ma-otp-185240316155443789.htm)
30. [Công an thông báo tới tất cả những ai nhận tin nhắn Zalo có nội dung sau](https://cafef.vn/cong-an-thong-bao-toi-tat-ca-nhung-ai-nhan-tin-nhan-zalo-co-noi-dung-sau-188261103062610369.chn)
31. [Công an phát thông báo quan trọng đến những ai hay nhắn tin với sếp, đồng nghiệp qua Zalo](https://kenh14.vn/cong-an-phat-thong-bao-quan-trong-den-nhung-ai-hay-nhan-tin-voi-sep-dong-nghiep-qua-zalo-215261102112733684.chn)
32. [Công an thông báo tới tất cả những ai nhận được tin nhắn Zalo có nội dung sau](https://kenh14.vn/cong-an-thong-bao-toi-tat-ca-nhung-ai-nhan-duoc-tin-nhan-zalo-co-noi-dung-sau-215261102233031626.chn)
33. [Hai phó giám đốc sở bị hack Zalo, nhắn mượn tiền nhiều người](https://dantri.com.vn/phap-luat/hai-pho-giam-doc-so-bi-hack-zalo-nhan-muon-tien-nhieu-nguoi-20261115110520323.htm)
34. [Zalo bị chiếm quyền qua đường dẫn bình chọn giả, hai phó giám đốc sở ở Khánh Hòa bị mạo danh](https://baodanang.vn/zalo-bi-chiem-quyen-qua-duong-dan-binh-chon-gia-hai-pho-giam-doc-so-o-khanh-hoa-bi-mao-danh-3358626.html)
35. [Phó Giám đốc sở bị mất tài khoản Zalo chỉ sau vài phút bằng chiêu thức lừa đảo này](https://traderviet.tv/t/pho-giam-doc-so-bi-mat-tai-khoan-zalo-chi-sau-vai-phut-bang-chieu-thuc-lua-dao-nay.120995/)
36. [Các lãnh đạo sở bị hack Zalo mạo danh vay tiền - Tuổi Trẻ Online](https://tuoitre.vn/tu-vu-2-lanh-dao-so-bi-hack-zalo-cong-an-nhac-bai-hoc-cu-ve-link-va-ma-qr-gia-mao-100261115102150087.htm)
37. [Cảnh báo thủ đoạn chiếm quyền tài khoản Zalo, giả lãnh đạo để lừa đảo](https://vietbao.vn/canh-bao-thu-doan-chiem-quyen-tai-khoan-zalo-gia-lanh-dao-de-lua-dao-614145.html)
38. [Nghe lời sếp chuyển khoản 4,5 tỷ đồng cho đối tác, nữ kế toán rơi vào "bẫy lừa đảo": Cảnh sát vào cuộc bắt giữ 7 đối tượng phạm pháp](https://cafef.vn/nghe-loi-sep-chuyen-tien-cho-doi-tac-nu-ke-toan-khien-tai-khoan-cong-ty-bay-mau-45-ty-dong-7-doi-tuong-lua-dao-bi-canh-sat-bat-giu-188240702142024263.chn)
39. [Hàng trăm người bỗng dưng bị 'lùa' vào nhóm 'việc nhẹ lương cao'](https://thanhnien.vn/hang-tram-nguoi-bong-dung-bi-lua-vao-nhom-viec-nhe-luong-cao-185231017185710442.htm)
40. [Cảnh giác hình thức lừa đảo 'việc nhẹ lương cao'](https://tin3mien247.com/canh-giac-hinh-thuc-lua-dao-viec-nhe-luong-cao.html)
41. [Cảnh báo chiêu trò lừa đảo "việc nhẹ lương cao" trên mạng xã hội](https://vtv.vn/xa-hoi/canh-bao-chieu-tro-lua-dao-viec-nhe-luong-cao-tren-mang-xa-hoi-20220830174757621.htm)
42. [Bẫy tuyển dụng online lừa đảo người tìm việc - Kỳ 2: Chiêu trò lừa đảo trên Telegram](https://tuoitre.vn/bay-tuyen-dung-online-lua-dao-nguoi-tim-viec-ky-2-chieu-tro-lua-dao-tren-telegram-2023083010523942.htm)
43. [Khi lời mời “đánh giá dịch vụ” trở thành chiếc bẫy chuyển tiền](https://lsvn.vn/khi-loi-moi-danh-gia-dich-vu-tro-thanh-chiec-bay-chuyen-tien-a179518.html)
44. [Mất tiền vì chiêu trò “việc nhẹ - lương cao”](https://tuoitre.vn/plo/mat-tien-vi-chieu-tro-viec-nhe-luong-cao-109741859.htm)
45. [Nhiều người vẫn 'sập bẫy' lừa đảo trên Telegram, Facebook, Zalo...](https://thanhnien.vn/nhieu-nguoi-van-sap-bay-lua-dao-tren-telegram-facebook-zalo-185230414150936028.htm)
46. [Bẫy "việc nhẹ lương cao" ngày càng tinh vi - Báo Người Lao Động](https://tuoitre.vn/nld/bay-viec-nhe-luong-cao-ngay-cang-tinh-vi-196240111210255792.htm)
47. [Ma trận đầu tư chứng khoán, tiền ảo bủa vây người dân](https://thanhnien.vn/ma-tran-dau-tu-chung-khoan-tien-ao-bua-vay-nguoi-dan-185240918224152162.htm)
48. [Đầu tư chứng khoán: Bị lừa tiền tỉ bởi 'thầy' online](https://tuoitre.vn/dau-tu-chung-khoan-bi-lua-tien-ti-boi-thay-online-20230303080336959.htm)
49. [Chiêu trò lừa đảo chứng khoán: Dựng app giả, hốt tiền thật](https://vnreview.vn/threads/chieu-tro-lua-dao-chung-khoan-dung-app-gia-hot-tien-that.63141/)
50. [Cảnh báo thủ đoạn lừa đảo tình cảm qua mạng, dẫn dụ đầu tư, chiếm đoạt tài sản](https://congan.laichau.gov.vn/index.php/thu-doan-pham-toi/canh-bao-thu-doan-lua-dao-tinh-cam-qua-mang-dan-du-dau-tu-chiem-doat-tai-san-2923.html)
51. [“Sập bẫy” đầu tư chứng khoán - Bài 2: “Mật ngọt” từ chuyên gia “dởm”](https://diendandoanhnghiep.vn/sap-bay-dau-tu-chung-khoan-bai-2-mat-ngot-tu-chuyen-gia-dom-10130544.html)
52. [Chào mời ngày đêm, 'thầy' chứng khoán online hứa 'phím' cổ phiếu rồi tặng cả tiền - Tuổi Trẻ Online](https://tuoitre.vn/chao-moi-ngay-dem-thay-chung-khoan-online-hua-phim-co-phieu-roi-tang-ca-tien-20241219213329292.htm)
53. [Cảnh báo thủ đoạn lừa đảo qua tin nhắn “trúng thưởng - quay số may mắn” dịp hè - Công an tỉnh](https://congan.dongthap.gov.vn/en/chi-tiet-bai-viet/-/asset_publisher/wbj7qfWZntAi/content/id/24855358)
54. [Nhận tin nhắn trúng thưởng từ Facebook, chủ nhân bị lừa hàng chục triệu đồng](https://thanhnien.vn/nhan-tin-nhan-trung-thuong-tu-facebook-chu-nhan-bi-lua-hang-chuc-trieu-dong-185700021.htm)
55. [Kiếm tiền tỷ bằng lừa đảo tin nhắn trúng thưởng](https://vietnamnet.vn/kiem-tien-ty-bang-lua-dao-tin-nhan-trung-thuong-614492.html)
56. [Cảnh giác thủ đoạn lừa đảo nhận quà từ nước ngoài](https://www.qdnd.vn/ban-doc/thu-ban-doc/canh-giac-thu-doan-lua-dao-nhan-qua-tu-nuoc-ngoai-701695)
57. [Thủ đoạn tặng, gửi quà từ nước ngoài để lừa đảo chiếm đoạt tài sản](https://anninhthudo.vn/thu-doan-tang-gui-qua-tu-nuoc-ngoai-de-lua-dao-chiem-doat-tai-san-post527829.antd)
58. [Sập bẫy nhận quà của 'lính Mỹ', bị lừa 2,2 tỷ đồng - Tuổi Trẻ Online](https://tuoitre.vn/sap-bay-nhan-qua-cua-linh-my-bi-lua-22-ty-dong-1321086.htm)
59. [Cảnh giác thủ đoạn mạo danh người nước ngoài lừa đảo gửi quà về Việt Nam](https://baobacninhtv.vn/bg/phap-luat/396782/canh-giac-thu-doan-mao-danh-nguoi-nuoc-ngoai-lua-dao-gui-qua-ve-viet-nam.html)
60. [Cảnh giác với các thủ đoạn lừa đảo trúng thưởng qua tin nhắn - Báo Đắk Lắk điện tử](https://baodaklak.vn/channel/3485/201807/canh-giac-voi-cac-thu-doan-lua-dao-trung-thuong-qua-tin-nhan-5590769/)
61. [Cảnh giác với các thủ đoạn lừa đảo trúng thưởng qua tin nhắn - Xuất bản thông tin](https://hoinongdan.daklak.gov.vn/phong-trao-nong-dan-am-bao-anqp/-/asset_publisher/HoZOBUYNQajq/content/canh-giac-voi-cac-thu-oan-lua-ao-trung-thuong-qua-tin-nhan/pop_up?_101_INSTANCE_HoZOBUYNQajq_viewMode=print)
62. [Bắt nhóm lừa đảo Chúc mừng bạn trúng thưởng xe SH...](https://danviet.vn/bat-nhom-lua-dao-chuc-mung-ban-trung-thuong-xe-sh-7777640612-d404423.html)
63. [Bắt nhóm lừa đảo 'chúc mừng bạn trúng thưởng xe SH'](https://znews.vn/bat-nhom-lua-dao-chuc-mung-ban-trung-thuong-xe-sh-post600548.html)
64. [Bắt giữ nhóm lừa đảo 'Chúc mừng bạn trúng thưởng xe SH...'](https://plo.vn/bat-giu-nhom-lua-dao-chuc-mung-ban-trung-thuong-xe-sh-post363214.html)
65. [Công an thông báo đến toàn bộ người dân nhận được tin nhắn SMS, Zalo, Messenger có cùng nội dung sau](https://cafef.vn/cong-an-thong-bao-den-toan-bo-nguoi-dan-nhan-duoc-tin-nhan-sms-zalo-messenger-co-cung-noi-dung-sau-188261123124138116.chn)
66. [Công an phát thông báo quan trọng đến những ai nhận được tin nhắn SMS, Zalo, Facebook, Email có nội dung này](https://giadinh.suckhoedoisong.vn/cong-an-phat-thong-bao-quan-trong-den-nhung-ai-nhan-duoc-tin-nhan-sms-zalo-facebook-email-co-noi-dung-nay-17226112300563863.htm)
67. [Công an phát thông báo tới những ai nhận cuộc gọi, tin nhắn có nội dung sau](https://soha.vn/cong-an-phat-thong-bao-toi-nhung-ai-nhan-cuoc-goi-tin-nhan-co-noi-dung-sau-198261115145117394.htm)
68. [Giả mạo nhân viên sân bay lừa hành khách đóng phí hải quan - VnExpress](https://vnexpress.net/phap-luat/gia-mao-nhan-vien-san-bay-lua-hanh-khach-dong-phi-hai-quan-3772473.html)
69. [Bị lừa hơn 1 tỷ vì tin ‘thùng quà từ Mỹ’ của bạn trai nước ngoài - Vụ án - ZNEWS.VN](https://znews.vn/bi-lua-hon-1-ty-vi-tin-thung-qua-tu-my-cua-ban-trai-nuoc-ngoai-post832949.html)
70. [Cảnh giác với thủ đoạn lừa đảo chuyển quà về từ nước ngoài](https://conganthanhhoa.gov.vn/tin-tuc-su-kien/tin-an-ninh-trat-tu/canh-giac-voi-thu-doan-lua-dao-chuyen-qua-ve-tu-nuoc-ngoai.html)
71. [Những cú lừa bạc tỉ bằng màn kịch tặng quà qua đường hàng không](https://cand.vn/Lan-theo-dau-vet-toi-pham/Nhung-cu-lua-bac-ti-bang-man-kich-tang-qua-qua-duong-hang-khong-i382470/)
72. [Cảnh giác thủ đoạn lừa đảo nhận quà từ nước ngoài thông qua giao dịch bằng hình thức chuyển khoản](https://congan.tayninh.gov.vn/vi/chi-tiet-tin-tuc?Id=82102)
73. [Người đàn bà Mỹ mới quen đã 'gửi tặng tôi 450.000 đôla' - VnExpress](https://vnexpress.net/nguoi-dan-ba-my-moi-quen-da-gui-tang-toi-450-000-dola-3668322.html)
74. ["Người lính Mỹ ở vùng Vịnh" và những cú lừa ngoạn mục](https://cand.vn/nguoi-linh-my-o-vung-vinh-va-nhung-cu-lua-ngoan-muc-post564319.html)
75. [Bẫy quà hàng hiệu của 3 kẻ lừa tình - VnExpress](https://vnexpress.net/phap-luat/bay-qua-hang-hieu-cua-3-ke-lua-tinh-3024545.html)
76. [Cảnh giác thủ đoạn lừa đảo tình cảm trên không gian mạng](https://vietbao.vn/canh-giac-thu-doan-lua-dao-tinh-cam-tren-khong-gian-mang-616896.html)

---

# PHẦN II — BÁO CÁO GEMINI DEEP RESEARCH
(8 nhóm, mẫu nội dung có dẫn nguồn + phân tích tâm lý)

Tổng hợp dữ liệu hội thoại và kịch bản lừa đảo tài chính tại Việt Nam
Báo cáo này tổng hợp dữ liệu thực tế về tin nhắn, lời thoại và kịch bản lừa đảo tài chính nhắm vào người dân tại Việt Nam thuộc cả 8 nhóm hành vi được yêu cầu, trích xuất từ báo chí chính thống (VnExpress, Tuổi Trẻ, Công an nhân dân, Dân Trí, Thanh Niên, Lao Động, VietNamNet, CafeF, CafeBiz, VnEconomy, Tiền Phong), cổng thông tin Công an các địa phương, thông báo từ ngân hàng và tổ chức chuyển mạch (NAPAS, VIB, Agribank), đơn vị ứng cứu không gian mạng (VNCERT/CC, cùng trích dẫn gián tiếp Cục An toàn thông tin trên báo chí), trang tổng hợp ngành ngân hàng và phản ánh cộng đồng trên diễn đàn trực tuyến (Reddit r/vozforums, r/TroChuyenLinhTinh). Mỗi mục dưới đây trình bày các vụ việc và mẫu nội dung có dẫn nguồn, đường link gốc cùng phân tích thủ thuật tâm lý tương ứng.
Một giới hạn quan trọng của dữ liệu công khai cần được nêu rõ ngay từ đầu: trong các bài báo, cổng thông tin công an và nguồn dữ liệu mở đã rà soát, không có nhóm nào cung cấp đủ 3–5 đoạn nhật ký chat nguyên văn dài 5–15 tin nhắn liên tiếp dưới dạng văn bản thuần. Nguyên nhân là các tòa soạn thường nhúng nội dung chat Zalo hoặc Facebook Messenger dưới dạng ảnh chụp màn hình để bảo vệ danh tính nạn nhân hoặc tường thuật lại diễn biến theo trình tự sự việc, đồng thời các nhóm Facebook cảnh báo lừa đảo hoạt động theo chế độ riêng tư/đóng kín không thể truy xuất từ chỉ mục công khai.
Để bảo đảm tính xác thực tuyệt đối và không tự tạo hội thoại giả lập, báo cáo tách bạch hai lớp thông tin trong từng nhóm: các câu nguyên văn tin nhắn hoặc lời thoại thực tế được báo chí và nguồn cộng đồng ghi nhận nguyên trạng (giữ nguyên teencode, cách viết địa phương, dấu câu hoặc đường dẫn giả mạo) và các chuỗi tương tác thực tế nhiều bước đã được cơ quan chức năng hoặc báo chí xác minh. Nhóm 6 (đầu tư cam kết lãi cao) hiện chỉ có 3 mục tổng hợp về khẩu hiệu, danh xưng và cơ chế mồi lãi do không ghi nhận được đoạn chat đọc lệnh nhiều lượt bằng chữ; phần cuối báo cáo đề xuất các kênh thực địa để thu thập bổ sung dữ liệu chat nguyên văn dài 5–15 lượt tin nhắn.
Tổng quan độ phủ dữ liệu và cơ chế tâm lý theo 8 nhóm lừa đảo
Bảng dưới đây đối chiếu số lượng mẫu thực tế thu thập được, loại hình bằng chứng văn bản hiện có, nền tảng tiếp cận chủ đạo và cơ chế tâm lý cốt lõi của từng nhóm hành vi.
1. Giả danh người thân xin chuyển tiền gấp
Các vụ giả danh người thân, bạn bè chủ yếu khai thác việc chiếm quyền tài khoản Facebook hoặc Zalo thông qua đường dẫn bình chọn, khảo sát hoặc mã QR giả mạo, sau đó dùng chính danh bạ sẵn có để dựng tình huống chuyển tiền khẩn cấp. Các câu tin nhắn thực tế thường ngắn gọn, dùng teencode hoặc cách viết địa phương để mô phỏng giọng điệu quen thuộc.
Mẫu 1.1: Vụ hack Zalo hai Phó Giám đốc sở tại Khánh Hòa (11/2026)
Nguồn ghi nhận từ Báo Tuổi Trẻ (tin ngày 14/11/2026) và bài phân tích tiếp theo trên Báo Tuổi Trẻ (tin ngày 15/11/2026). Dưới đây là nguyên văn tin nhắn mượn tiền phát đi từ tài khoản Zalo bị chiếm đoạt của ông C.V.A. (phó giám đốc một sở), kèm nguyên văn thông báo đính chính của một nạn nhân bị hack khác là ông N.Đ.S.:
"Tài khoản còn đủ 30 triệu ko (không) cho mượn chuyển vào số này có tí việc. Sáng mai gởi lại được không"
"Zalo của S. bị hack mượn rất nhiều tiền. Các bạn và anh chị đừng thực hiện nhé. Cám ơn"
Thủ thuật tâm lý trong tin nhắn mạo danh dựa trên văn phong tự nhiên, sử dụng viết tắt teencode "ko" (phần chú thích trong ngoặc do báo chèn thêm) và cách viết "gởi" nhằm xóa cảm giác soạn thảo rập khuôn. Mức tiền 30 triệu đi kèm cụm từ giảm nhẹ "có tí việc" đánh vào tâm lý nể nang, ngại từ chối đối với người quen biết, còn cam kết "Sáng mai gởi lại" tạo cảm nhận rằng giao dịch chỉ mang tính tạm ứng ngắn hạn, ít rủi ro.
Mẫu 1.2: Vụ hack Zalo Giám đốc sở tại Cà Mau (04/2026)
Nguồn từ 24h dẫn lại Báo Người Lao Động và đối chiếu thêm trên Báo Tuổi Trẻ. Nguyên văn tin nhắn kẻ xấu gửi từ tài khoản Zalo bị chiếm quyền của một giám đốc sở ở Cà Mau như sau:
"Còn đủ 30 triệu không. Cho mượn chuyển qua số này có việc. Sáng mai chuyển lại được không, tài khoản đang lỗi chưa chuyển được"
Về mặt tâm lý và cấu trúc kịch bản, câu chữ gần như trùng khớp với vụ việc tại Khánh Hòa, cho thấy các nhóm lừa đảo dùng mẫu câu chuẩn hóa trên nhiều địa phương. Việc đưa sẵn lý do "tài khoản đang lỗi chưa chuyển được" đóng vai trò rào trước để hợp thức hóa yêu cầu chuyển tiền vào một tài khoản ngân hàng mang tên người khác, dập tắt nghi vấn ngay trước khi người nhận thực hiện thao tác chuyển khoản.
Mẫu 1.3: Vụ giả mạo bạn thân gọi video Deepfake vay tiền đáo hạn ngân hàng
Nguồn từ cổng thông tin điện tử Bộ Khoa học và Công nghệ. Kịch bản bắt đầu bằng việc kẻ gian dùng tài khoản giả mạo bạn thân của bà L. nhắn tin qua Facebook hỏi mượn tiền để đáo hạn ngân hàng. Khi bà L. gọi video qua mạng để kiểm chứng, màn hình hiện lên khuôn mặt bạn thân nhưng khá mờ và âm thanh chập chờn; lúc bà L. thắc mắc, đối tượng đáp lại nguyên văn rằng mình "đang ở vùng sóng yếu".
Thủ thuật tâm lý ở đây tận dụng phản xạ tin vào hình ảnh trực quan ("nhìn thấy mặt và nghe thấy tiếng là người quen thật") để vượt qua bước gọi video xác minh. Lý do "đang ở vùng sóng yếu" chuyển hướng nghi ngờ của nạn nhân từ vấn đề xác thực danh tính sang lỗi đường truyền viễn thông, làm suy giảm động lực kiểm chứng tiếp.
Mẫu 1.4: Vụ giả danh chồng ở Hàn Quốc nhờ chuyển tiền cấp cứu tai nạn (Đồng Hới)
Nguồn từ VnEconomy, đối chiếu thêm chi tiết hành vi hối thúc từ VnExpress, Báo Tuổi Trẻ / Người Lao Động và Thương hiệu và Công luận dẫn Công an tỉnh An Giang.
Tại Đồng Hới, chị Q. nhận tin nhắn Messenger từ tài khoản Facebook "B. K. Đ." của chồng đang lao động tại Hàn Quốc, nhờ chuyển tiền giúp một người bạn của chồng ở Việt Nam lo chi phí phẫu thuật vì tai nạn. Chị Q. có gọi video cho tài khoản chồng và gọi điện cho bạn của chồng để xác minh, sau đó vẫn tin đúng là chồng nhắn nên đã chuyển tiền 4 lần với tổng cộng 200 triệu đồng vào số tài khoản 17710000….. mang tên Dang Van H.. Ở các biến thể cùng thủ đoạn được báo chí và công an ghi nhận, kẻ gian thường lấy lý do ngân hàng lỗi mạng cần chuyển gấp, sử dụng tài khoản ngân hàng trùng tên với chủ tài khoản mạng xã hội bị hack để đánh lạc hướng, hoặc gọi điện hối thúc chỉ sau hơn 5 phút nếu nạn nhân chưa phản hồi tin nhắn.
Thủ thuật tâm lý kết hợp giữa tình huống cấp cứu sinh mạng (khiến nạn nhân đặt sự lo lắng cho người gặp nạn lên trên quy trình kiểm tra chéo) và áp lực rút ngắn thời gian phản ứng (gọi điện thúc giục liên tiếp sau vài phút) nhằm ngăn người nhận kịp trao đổi với người thân khác.
2. Giả danh công an, tòa án điều tra rửa tiền
Nhóm lừa đảo giả danh cơ quan tố tụng thường bắt đầu bằng cuộc gọi tự động hoặc tin nhắn, sau đó chuyển hướng sang Zalo hoặc Zoom để dựng bối cảnh cơ quan điều tra. Do trọng tâm của thủ đoạn là áp đặt nỗi sợ pháp lý, báo chí ghi nhận được khá rõ cả lời thoại hù dọa trực diện lẫn các chỉ dẫn che giấu giao dịch.
Mẫu 2.1: Cuộc gọi tự xưng bưu chính và Viện kiểm sát nhân dân tối cao dọa tội rửa tiền (10/2019)
Nguồn từ Báo Lao Động và bài tường thuật cùng vụ chia sẻ của anh Chính Vũ trên Báo Thanh Niên. Theo nội dung tường thuật trực tiếp từ người nghe cuộc gọi, trình tự đối thoại diễn ra như sau:
Người nghe bấm phím 9 vì tò mò, đầu dây bên kia là một giọng nữ ngọt ngào hỏi anh có muốn biết nội dung bưu phẩm hay không; người nghe trả lời "có".
Giọng nữ bảo anh lấy giấy bút ghi lại thông báo: "Anh Lê Đức Lâm, có Số CMND... Mã hồ sơ: xxx9739. Mã thẻ: 1268457xxx... Ngày mở thẻ: 20.5.2019. ... Số nợ chưa thanh toán là: 45.986.350 đồng. Và anh có một giấy triệu tập của Viện kiểm sát nhân dân tối cao nhưng vì tính bảo mật nên bên em không thể tiết lộ được nội dung."
Giọng nữ hỏi lại có đúng như vậy không, người nghe đáp: "Không! Chắc có sự nhầm lẫn nào đó?"
Theo tường thuật liên quan đến bài chia sẻ của bạn Chính Vũ, cuộc gọi tiếp tục dẫn sang hù dọa tội rửa tiền với nhận định rằng anh Chính Vũ có thể là người bị hại hoặc chính là tội phạm. Dưới bài đăng, một người dùng mạng khác tên Nguyễn Lĩnh chia sẻ câu trả lời phản kháng của mình khi từng nhận 3–4 cuộc gọi tương tự: "Ai bán thông tin của chị. Nếu chị không cung cấp tôi báo công an làm việc với chị".
Thủ thuật tâm lý của kịch bản này vận hành qua ba lớp: sử dụng kỹ thuật từng bước (để nạn nhân tự bấm phím 9 và tự ghi chép thông tin nhằm tăng mức độ nhập cuộc); cài số liệu lẻ cụ thể (45.986.350 đồng, mã hồ sơ, ngày mở thẻ) để tạo ảo giác truy xuất từ hệ thống hồ sơ thật; và đặt nạn nhân vào vùng xám trách nhiệm (vừa có thể là bị hại vừa có thể là tội phạm) kèm lý do bảo mật, kích hoạt phản xạ tự thanh minh.
Mẫu 2.2: Vụ "công an giả" tại Hà Nội gọi video Zalo nhầm cho cán bộ công an tại Cao Bằng (06/2023)
Nguồn từ Báo Dân Trí. Sáng 17/6/2023, anh V.Q. (cán bộ Công an tỉnh Cao Bằng) đang trực thì nhận cuộc gọi từ số 0917.463.494, tự xưng là cán bộ phòng tiếp nhận, xử lý hồ sơ thuộc Công an TP Hà Nội. Người gọi thông báo số CMND của anh Q. được dùng đăng ký số 0937.052.342 vào ngày 9/3 tại Mobifone TP Hà Nội để chào bán thiết bị vật tư y tế và yêu cầu nhiều người chuyển tiền chiếm đoạt tài sản. Đối tượng yêu cầu anh Q. đến Công an TP Hà Nội báo án, và nếu không đến được thì kết bạn Zalo gọi video xác minh với cán bộ tên Lê Hải Sơn. Khi thấy anh V.Q. mặc quân phục công an thật trên video Zalo, đối tượng Lê Hải Sơn giật mình thốt lên nguyên văn "đang định lừa đảo tí thì gặp ngay công an", rồi hạ giọng xin "cứu em với".
Thủ thuật tâm lý chính là tạo khoảng cách địa lý nhân tạo: gán vụ án cho cơ quan công an ở tỉnh, thành khác (Hà Nội gọi cho người ở Cao Bằng) khiến việc đến trình diện trực tiếp trở nên khó khăn, qua đó đẩy nạn nhân chọn phương án thay thế là làm việc trực tuyến qua Zalo dưới sự dẫn dắt của kẻ lừa đảo.
Mẫu 2.3: Vụ giả danh công an ép ghi nội dung "chuyển tiền đám cưới" tại Đồng Tháp (11/2025)
Nguồn từ Báo Tuổi Trẻ. Kẻ lừa đảo gọi điện xưng là lực lượng công an, thông báo bà P. liên quan đến một vụ án ma túy và rửa tiền, đồng thời dàn dựng bối cảnh cơ quan điều tra đang làm việc để gọi video đe dọa tinh thần. Đối tượng cấm bà P. tiết lộ thông tin cho bất kỳ ai dưới lời đe dọa sẽ bắt giữ, xử lý hình sự, và yêu cầu khi ra ngân hàng không được nói chuyện nhiều với giao dịch viên. Bà P. bị buộc chuyển 136 triệu đồng vào tài khoản mà chúng tự xưng là của viện kiểm sát để "phục vụ công tác điều tra", nhưng phải ghi nội dung chuyển khoản là "chuyển tiền đám cưới" để nhân viên ngân hàng không nghi ngờ. Công an phường Đạo Thạnh sau đó đã kịp thời tiếp nhận trình báo và ngăn chặn giao dịch.
Thủ thuật tâm lý nổi bật nhất là vô hiệu hóa hàng rào cảnh báo tại quầy ngân hàng. Bằng cách hợp thức hóa việc nói dối giao dịch viên ("chuyển tiền đám cưới") như một phần của nghĩa vụ bảo mật án điều tra, kẻ gian biến nhân viên ngân hàng từ người có thể giúp nạn nhân thành "đối tượng cần che giấu".
Mẫu 2.4: Kịch bản "bắt cóc online" qua Zoom nhắm vào sinh viên Hà Nội (05–06/2025)
Nguồn từ VietNamNet (vụ nam sinh viên mất hơn 7 tỷ), VietNamNet (loạt kịch bản lừa đảo mới), Eva dẫn cảnh báo của Phòng Cảnh sát hình sự, Công an TP Hà Nội và phản ánh tương tự của người dùng mạng trên Reddit r/vozforums.
Tại quận Cầu Giấy (Hà Nội), chỉ trong hai tháng 5 và 6/2025, cơ quan công an ghi nhận liên tiếp ba vụ sinh viên sập bẫy: anh C. (SN 2005) mất hơn 7 tỷ đồng sau cáo buộc dính án rửa tiền do Công an TP Hải Phòng thụ lý; anh N. (SN 2005) mất 500 triệu đồng sau cuộc gọi video có người mặc sắc phục đọc "lệnh bắt giữ" và "phong tỏa tài khoản"; chị L. (SN 2006) chuyển gần 3 tỷ đồng vì bị vu liên quan đường dây rửa tiền, ma túy ở Quảng Ninh.
Theo mô tả của Công an TP Hà Nội và VietNamNet, quy trình thao túng diễn ra theo chuỗi: thông báo căn cước công dân dính đường dây rửa tiền hoặc ma túy (nhiều trường hợp trên diễn đàn mạng như r/vozforums còn phản ánh bị kẻ gọi đọc đúng cả số căn cước lẫn số BHXH) -> mời gọi video qua Zoom, mặc sắc phục, đưa thẻ ngành, dựng bối cảnh trụ sở và yêu cầu "hợp tác điều tra nội bộ" -> ép nạn nhân xóa hết các ứng dụng liên lạc khác, chỉ giữ Zoom để cách ly hoàn toàn với gia đình, bạn bè -> yêu cầu tự quay video khỏa thân để "xác minh đặc điểm nhận dạng", rồi dùng chính tài khoản mạng xã hội của nạn nhân nhắn tin về gia đình dàn dựng "bắt cóc online" đòi tiền chuộc.
Thủ thuật tâm lý của nhánh này phối hợp ba tầng khống chế: gây choáng ngợp bằng hình ảnh sắc phục và trụ sở dàn dựng, cắt đứt mạng lưới hỗ trợ xã hội bằng lệnh xóa ứng dụng chat, và khóa miệng nạn nhân bằng nỗi sợ lộ hình ảnh nhạy cảm.
3. Giả danh ngân hàng yêu cầu xác minh tài khoản
Nhóm lừa đảo mạo danh ngân hàng phát tán chủ yếu qua tin nhắn SMS chứa đường dẫn giả mạo hoặc tập tin cài đặt chứa mã độc, sau đó kết hợp cuộc gọi và nhắn tin Zalo để chiếm đoạt mật khẩu, OTP hoặc dữ liệu sinh trắc học. Các mẫu tin nhắn nguyên văn dưới đây trích từ chuyên trang thuật ngữ ngành ngân hàng (vieclam.nganhang.com, là nguồn tổng hợp nghiệp vụ không phải cổng công an hay báo chí chính thống) kết hợp với cảnh báo chính thức từ NAPAS, Cục An ninh mạng và các ngân hàng năm 2024–2026.
Mẫu 3.1: Tin nhắn SMS giả mạo Vietcombank đe dọa tạm khóa tài khoản (06/2023)
Nguồn từ trang thuật ngữ Nghề Ngân hàng. Bài viết này ghi nhận vào tháng 6/2023 có hơn 2.500 khách hàng của một ngân hàng (được ký hiệu là Ngân hàng A) nhận được tin nhắn SMS từ đầu số lạ với nội dung nguyên văn:
"Tài khoản của quý khách sẽ bị tạm khóa. Vui lòng truy cập https://vietcombank-secure.top để xác minh trong vòng 12 giờ."
Thủ thuật tâm lý khai thác nỗi sợ mất quyền truy cập tài sản kết hợp hạn chót giả tạo ("trong vòng 12 giờ"), khiến người nhận ưu tiên xử lý nhanh qua đường dẫn có chứa tên thương hiệu (vietcombank-secure.top) và bỏ qua việc kiểm tra đuôi tên miền .top thay vì .vn hoặc .com.vn.
Mẫu 3.2: Tin nhắn SMS giả danh ngân hàng thông báo trúng thưởng tri ân 5 triệu đồng
Nguồn từ trang thuật ngữ Nghề Ngân hàng. Theo nguồn này, một đường dây tại Hà Nội sử dụng 45 SIM và 3 thiết bị SMS Gateway phát tán hơn 500.000 tin nhắn mỗi ngày, lừa đảo hơn 3.200 nạn nhân với thiệt hại gần 25 tỷ đồng qua mẫu tin nhắn nguyên văn:
"Chúc mừng quý khách đã trúng thưởng chương trình tri ân khách hàng của Ngân hàng B. Vui lòng truy cập link để nhận 5 triệu đồng."
Trang web giả gắn trong tin nhắn yêu cầu điền họ tên, số CMND, số tài khoản, mật khẩu Internet Banking và mã OTP. Thủ thuật tâm lý nằm ở con số thưởng vừa tầm (5 triệu đồng): đủ hấp dẫn để kích thích thao tác nhận quà, nhưng không quá phi lý đến mức làm bật ngay cơ chế nghi ngờ.
Mẫu 3.3: Tin nhắn SMS phát tán tệp tin .apk giả mạo xác nhận đơn hàng và chiêu hỗ trợ nâng cấp ứng dụng (2024–07/2026)
Nguồn từ trang thuật ngữ Nghề Ngân hàng và An sinh – Tạp chí Kinh tế Tài chính (07/2026). Theo ghi nhận đầu năm 2024 trên Nghề Ngân hàng, chiến dịch phát tán phần mềm gián điệp Android SpyNote sử dụng mẫu tin nhắn SMS nguyên văn:
"Đơn hàng của bạn đã được xác nhận. Theo dõi tại: [link]. apk"
Khi tệp .apk được cài đặt, SpyNote có thể đọc trộm SMS (gồm cả mã OTP), theo dõi thao tác bàn phím (keylogger) và tự động chụp màn hình lúc đăng nhập Internet Banking. Đến tháng 7/2026, Tạp chí Kinh tế Tài chính cảnh báo biến thể giả danh nhân viên các ngân hàng như MSB, Vietcombank, BIDV liên hệ trực tiếp mời hỗ trợ nâng cấp ứng dụng ngân hàng để phát tán mã độc nhằm mục đích chiếm quyền điều khiển thiết bị.
Thủ thuật tâm lý của hai biến thể này dựa trên phản xạ xử lý sự cố ngoài dự kiến: khiến người dùng tò mò về một đơn hàng lạ hoặc lo ứng dụng ngân hàng bị gián đoạn nếu không nâng cấp kịp thời, từ đó tự tay cấp quyền cài đặt phần mềm ngoài kho ứng dụng chính thức.
Mẫu 3.4: Chèn luồng SMS Brandname giả mạo NAPAS và dụ "hỗ trợ" xác thực sinh trắc học (2024–11/2026)
Nguồn từ CafeF (25/11/2026), CafeBiz (26/11/2026), Tiền Phong và Kenh14 (10/2026) cho nhánh SMS Brandname; cùng VnExpress và Báo Tuổi Trẻ cho nhánh sinh trắc học.
Ở nhánh SMS cuối năm 2026, Cục An ninh mạng và NAPAS cảnh báo tin nhắn giả mạo xuất hiện ngay trong luồng hội thoại SMS chính thức trước đó của ngân hàng hoặc giả danh tin nhắn thương hiệu NAPAS, yêu cầu "hoàn tất xác minh bảo mật thẻ tín dụng" hoặc mời "đổi điểm" theo thể lệ ưu đãi trên website có tên miền giả liên quan đến NAPAS để đánh cắp dữ liệu thẻ. Ở nhánh sinh trắc học (áp dụng với giao dịch trực tuyến trên 10 triệu đồng), sau khi người dân gặp khó khăn thao tác NFC, nhiều số điện thoại liên tục gọi đến đòi kết bạn Zalo, yêu cầu chụp ảnh CCCD hai mặt và thông tin cá nhân để "hỗ trợ từ xa", hoặc dụ gọi video thu thập giọng nói, biểu cảm khuôn mặt. Một nạn nhân được VnExpress ghi nhận chỉ thoát khỏi sự quấy nhiễu khi tuyên bố sẽ ra trực tiếp chi nhánh ngân hàng cạnh nhà.
Thủ thuật tâm lý của nhánh SMS Brandname là phá vỡ lớp phòng vệ dựa trên ngữ cảnh hiển thị: khi tin nhắn nằm chung hộp thư với thông báo giao dịch thật của ngân hàng, người dùng mặc định tin tưởng nội dung bên trong. Trong khi đó, nhánh sinh trắc học khai thác sự lúng túng công nghệ của người cao tuổi trước quy định bảo mật mới để biến yêu cầu lấy ảnh CCCD và dữ liệu khuôn mặt thành thao tác "hỗ trợ kỹ thuật".
4. Giả danh sếp, đồng nghiệp nhờ chuyển tiền đối tác
Lừa đảo nhắm vào doanh nghiệp và nhân sự kế toán (CEO Fraud / Business Email Compromise – BEC) hoạt động bằng cách khai thác cấu trúc thứ bậc công việc và tâm lý ngại hỏi lại cấp trên. Tại Việt Nam, thủ đoạn này gồm hai biến thể chính: kéo kế toán vào nhóm chat giả danh ban lãnh đạo, và giả mạo email hoặc tin nhắn yêu cầu đổi tài khoản nhận thanh toán của đối tác.
Mẫu 4.1: Vụ nữ kế toán bị đưa vào nhóm chat giả danh "lãnh đạo" và chuyển tiền 9 lần
Nguồn từ CafeF. Theo bản tin ngày đầu tháng 10/2022 về nhân viên kế toán tên Tân, cô được đưa vào một nhóm chat và nhận yêu cầu chuyển tiền cho khách hàng từ "lãnh đạo" trong nhóm. Tin theo chỉ đạo này, cô Tân đã chuyển khoản 9 lần liên tiếp; đến lần thứ 10 mới phát hiện bất thường và báo cảnh sát thu hồi kịp 3 tỷ đồng trong 8 phút. (Lưu ý: phần trích xuất bài báo của CafeF không nêu rõ vụ việc xảy ra tại Việt Nam hay được tường thuật từ vụ việc quốc tế, nhưng mô tả đúng cơ chế nhóm chat giả danh sếp phổ biến tại doanh nghiệp).
Thủ thuật tâm lý của kịch bản này dựa trên hiệu ứng đồng thuận nhóm giả lập: đặt nhân viên tài chính vào một phòng chat tập thể mang danh nghĩa ban lãnh đạo khiến nạn nhân tin rằng các khoản chi đã được thống nhất thông qua, từ đó giảm sự cảnh giác trong suốt nhiều lượt chuyển khoản liên tiếp.
Mẫu 4.2: Vụ nữ kế toán làm giả lệnh chuyển tiền phản công nhóm chat mạo danh sếp
Nguồn từ CafeF, Kenh14 và bản tin về biến thể tương ứng 700.000 USD ("5 triệu nhân...") trên Người Quan Sát.
Trong vụ việc được CafeF và Kenh14 đăng tải tháng 8/2024, các đối tượng lập nhóm chat gồm nhiều nhân vật giả danh sếp phối hợp yêu cầu nữ kế toán duyệt chuyển khoản 3 tỷ đồng. Phát hiện dấu hiệu bất thường, nữ kế toán đã tự làm giả một lệnh chuyển tiền rồi gửi ngược vào nhóm chat, kèm lời giải thích với các "sếp" giả về tình trạng "rằng hệ thống ngân hàng đã..." (nội dung cắt ngang ở đoạn trích báo chí) nhằm câu giờ xác minh, qua đó tránh được thiệt hại. Trên Người Quan Sát, kịch bản tương tự liên quan đến khoản 700.000 USD cũng ghi nhận việc hai nhân vật phối hợp trong nhóm chat để qua mặt bộ phận kế toán. (Tương tự Mẫu 4.1, các đoạn trích báo chí này không xác định rõ địa bàn vụ án ở Việt Nam hay nước ngoài, mà được dẫn lại để rút kinh nghiệm phòng ngừa tại doanh nghiệp).
Áp lực tâm lý mà nhóm tội phạm nhắm vào là thiên kiến phục tùng uy quyền (Authority Bias), kỳ vọng kế toán sẽ ngại gọi điện trực tiếp kiểm tra lại lãnh đạo vì sợ bị đánh giá thiếu nhạy bén hoặc làm chậm tiến độ công việc.
Mẫu 4.3: Kịch bản giả danh sếp và đối tác đổi tài khoản thanh toán trước giờ chốt hóa đơn (BEC & Deepfake)
Nguồn tổng hợp từ chuyên trang và blog nghiệp vụ An toàn tài chính, Trung tâm thông tin, MSO và tài liệu học thuật của sinh viên trên Studocu (ĐH KHXH&NV).
Theo mô tả cơ chế BEC của các đơn vị an toàn tài chính và doanh nghiệp trong nước, kẻ gian âm thầm đọc hộp thư bị chiếm hoặc thu thập thông tin đối tác công khai để biết chính xác lô hàng và hóa đơn sắp đến hạn. Sau đó, chúng gửi thư điện tử hoặc tin nhắn cho "kế toán công ty" yêu cầu thanh toán vào số tài khoản mới vào phút chót với lý do tài khoản cũ đang kiểm toán, công ty đổi sang tài khoản chi nhánh nước ngoài hoặc tài khoản cũ bị phong tỏa tạm thời, đồng thời dặn phải chuyển trước 17 giờ để kịp xuất hóa đơn. Một số kịch bản khác gửi yêu cầu lúc 2 giờ sáng, gắn nhãn giao dịch "bí mật" để cấm kiểm tra chéo, hoặc dùng cuộc gọi giả giọng sếp với lời thoại mô phỏng điển hình trong bài thuyết trình đào tạo nhận diện Deepfake tại ĐH KHXH&NV: 'Anh đang họp gấp với đối tác nước ngoài, em...' (đây là câu ví dụ minh họa kịch bản trong giáo trình, không phải lời thoại trích từ biên bản vụ án thật).
Thủ thuật tâm lý của dạng tấn công này phối hợp bối cảnh nghiệp vụ chính xác (đúng tên hợp đồng, đúng thời điểm thanh toán) với áp lực hạn chót hành chính (nỗi lo lỡ giờ xuất hóa đơn lúc 17 giờ hoặc làm lỡ cuộc họp đối tác của lãnh đạo).
Mẫu 4.4: Lãnh đạo cơ quan nhà nước bị hack Zalo nhắn tin mượn tiền đồng nghiệp (Khánh Hòa & Cà Mau 2026)
Nguồn từ Báo Công an nhân dân, Báo Tuổi Trẻ và 24h / Người Lao Động.
Hai tin nhắn nguyên văn thu thập tại Mẫu 1.1 và Mẫu 1.2 cũng chính là dữ liệu thực tế tiêu biểu cho nhóm giả danh lãnh đạo, đồng nghiệp trong hệ thống cơ quan tại Việt Nam, khi kẻ gian nhắm thẳng vào tài khoản Zalo của các giám đốc và phó giám đốc sở:
"Tài khoản còn đủ 30 triệu ko (không) cho mượn chuyển vào số này có tí việc. Sáng mai gởi lại được không"
"Còn đủ 30 triệu không. Cho mượn chuyển qua số này có việc. Sáng mai chuyển lại được không, tài khoản đang lỗi chưa chuyển được"
Theo phân tích từ Báo Tuổi Trẻ và khuyến cáo của Báo Công an nhân dân, việc chọn chiếm đoạt tài khoản của cán bộ lãnh đạo giúp kẻ gian đánh trúng tâm lý nể nang cấp trên và ngại xác minh trực tiếp của đồng nghiệp, cấp dưới, khiến nhiều người sẵn sàng chuyển tiền ngay dù số tài khoản nhận mang tên người khác.
5. Mời việc nhẹ lương cao, làm nhiệm vụ nạp tiền
Đây là nhóm lừa đảo có chuỗi tương tác nhiều bước rõ ràng nhất trong hồ sơ công an và báo chí Việt Nam. Kịch bản vận hành nhất quán qua 3 giai đoạn: gửi tin nhắn mời việc thu nhập hấp dẫn -> trả hoa hồng thật cho các đơn nhỏ ban đầu -> tăng dần giá trị nạp rồi viện lý do kỹ thuật để chiếm đoạt.
Mẫu 5.1: Tin nhắn tuyển dụng qua iMessage và bẫy tăng truy cập website tại Hà Nội
Nguồn từ Thế Giới Di Động dẫn lại VnExpress và VNCERT/CC. Chị Hải Yến (Hà Nội) nhận được hàng loạt tin nhắn rác qua iMessage từ nhiều Apple ID khác nhau với mở đầu nguyên văn:
"Chào bạn, tôi là trưởng phòng nhân sự, công ty đang tuyển nhân viên làm việc bán thời gian. Tiền lương được trả trong ngày. Bạn có thể làm việc tại nhà, kiếm từ 15 triệu đến 30 triệu mỗi tháng"
Theo trải nghiệm của anh Bình Minh (Hà Nội) khi nhắn tin phản hồi thử và xác nhận của VNCERT/CC, đối tượng tự xưng là tư vấn viên công ty nước ngoài, yêu cầu chỉ cần có điện thoại kết nối mạng và tài khoản Internet banking để làm công việc "tương tác tăng truy cập cho website bán hàng của đối tác, mỗi nhiệm vụ chỉ cần làm trong 10 phút là có thể nhận tiền hoa hồng". Ở mức khởi điểm, chọn gói 150.000 đồng sẽ nhận về 220.000 đồng, nạp 500.000 đồng nhận 650.000 đồng và tiền hoa hồng thực sự được chuyển về tài khoản ở các gói nhỏ ban đầu trước khi nâng lên mức hàng chục triệu đồng.
Thủ thuật tâm lý của tin nhắn mở đầu là hứa hẹn thu nhập cao không ràng buộc ("trả trong ngày", "làm việc tại nhà"), kết hợp cơ chế thưởng nhanh ở đơn đầu (Instant Gratification) để tạo cảm giác kiếm tiền dễ dàng trong vòng 10 phút.
Mẫu 5.2: Tin nhắn giao nhiệm vụ đầu tiên trong đường dây tại Nghệ An
Nguồn từ Báo Công an nhân dân. Ngay sau khi nạn nhân kết bạn theo tin tuyển cộng tác viên, đối tượng gửi tin nhắn bắt đầu với câu lệnh nguyên văn: "Nhiệm vụ 1: Hoa hồng cho sản phẩm này là 5%" (phần tin còn lại được báo mô tả nối tiếp là kèm số lượng sản phẩm và yêu cầu thanh toán).
Thủ thuật tâm lý của con số 5% nằm ở tính hợp lý thương mại: mức chiết khấu 5% trông gần với hoa hồng tiếp thị liên kết bình thường, giúp làm dịu sự đề phòng ở lần nạp tiền đầu tiên.
Mẫu 5.3: Chuỗi tương tác "tách nhóm 4 người" và app Coinbase giả (Tây Ninh & Khánh Hòa, 2022)
Nguồn từ Báo Tuổi Trẻ.
Ở trường hợp thứ nhất, chị Đ.T.Q.T. (35 tuổi, Tây Ninh) đọc tin tuyển cộng tác viên trên Facebook hứa "chỉ cần xem video TikTok và chia sẻ, các bạn sẽ có tiền ngay vào tài khoản". Liên hệ tài khoản P.A., chị được thêm vào nhóm lớn làm nhiệm vụ bậc 1 (15–20 video/ngày, nhận 15.000 đồng/video suốt 5 ngày). Khi đã có lòng tin, chị được tách sang nhóm nhỏ chỉ còn 4 thành viên để mua đơn hàng qua link sàn thương mại điện tử giả (gói 500.000 đồng nhận lại ngay 600.000 đồng). Sau hàng chục đơn trả tiền sòng phẳng, đến khi không nhận lại được tiền và hỏi người hướng dẫn, chị được yêu cầu phải thực hiện thêm một lượt mua hàng nữa mới lấy lại được gốc và lời của hai "nhiệm vụ"; do "phóng lao phải theo lao", chị thực hiện thêm đơn 20 triệu đồng nhưng vẫn mất trắng.
Ở trường hợp thứ hai, chị P.T.M.P. (25 tuổi, Khánh Hòa) liên hệ tài khoản Pinatas Bricia Gudino để làm nhiệm vụ trên ứng dụng giả danh Coinbase. Các gói 100.000–500.000 đồng ban đầu đều trả tiền ngay, sau đó thành viên trong nhóm giới thiệu chị gặp một "thầy" hứa giúp nhận tổng cộng hơn 120 triệu đồng và cho nạp trước 20% (hơn 20 triệu đồng). Khi lệnh rút bị lỗi, "thầy" đẩy sang bộ phận tư vấn khách hàng; bộ phận này cáo buộc chị thực hiện sai thử thách để ép nạp tiếp lên tới 100 triệu đồng, thậm chí đến khi chị van xin rút tiền vẫn bị xúi đi vay tín dụng đen chơi tiếp.
Hai thủ thuật tâm lý chủ đạo trong chuỗi tương tác này là cô lập trong phòng chat 4 người (tách nạn nhân vào nhóm siêu nhỏ gồm các tài khoản đồng bọn để điều khiển áp lực đồng thuận) và bẫy chi phí chìm kết hợp đổ lỗi ngược: khiến nạn nhân tin rằng tiền treo là do mình thao tác sai chứ không phải bị lừa.
Mẫu 5.4: Bảng nâng cấp 6 tầng VIP "App tình yêu" (tuyên án 06/2026) và vụ mất 1,7 tỷ trên st5533.com
Nguồn từ Báo Tuổi Trẻ (vụ án xét xử tháng 6/2026) và Báo Thanh Niên.
Theo hồ sơ vụ án 7 bị cáo sang Campuchia lừa đảo qua "app tình yêu" (tuyên án tháng 6/2026), khách hàng tham gia đánh giá 10 bộ phim theo 6 cấp độ VIP leo thang: Vip 1 nạp 500.000 đồng (hoa hồng 20%), Vip 2 nạp 2,5 triệu đồng (25%), Vip 3 nạp 5 triệu đồng (30%), Vip 4 nạp 10 triệu đồng (35%), Vip 5 nạp 25 triệu đồng (40%) và Vip 6 nạp 50 triệu đồng (45%). Chỉ khoản hoa hồng nhỏ ban đầu được rút; đến các gói lớn, nạn nhân bị chặn bằng đủ lý do như đóng thuế thu nhập cá nhân, chuyển tiền sai cú pháp hoặc tài khoản chưa đủ hạn mức rút.
Cùng cơ chế này, trên website st5533.com từ quảng cáo "việc làm online trên Tik Tok", chị T. (28 tuổi, TP.HCM) sau 2 nhiệm vụ đầu nhận gần 30% hoa hồng đã nạp đơn tăng từ 21 triệu đồng lên 800 triệu đồng và đến lượt thứ 9 hơn 900 triệu đồng, mất tổng cộng hơn 1,7 tỉ đồng; khi bế tắc, chị phải nhắn hỏi 2 người cùng nhóm xem họ đã rút được tiền hay chưa. Một nạn nhân khác là anh D. (Hà Nội, mất hơn 121 triệu đồng) dù biết rõ cảnh báo việc nhẹ lương cao trên mạng vẫn thừa nhận trạng thái mất tỉnh táo khi bị cuốn vào vòng xoáy:
"Ai ở trong hoàn cảnh đó mới thấy bản thân như mất hết lý trí, không suy nghĩ được gì cả"
Thủ thuật tâm lý của mô hình đa tầng này là trò chơi hóa bậc thang lợi nhuận (Gamification) đẩy dần mức cược, dẫn tới hiệu ứng đường hầm nhận thức: mọi cảnh báo từng đọc trước đó bị gạt bỏ vì nạn nhân chỉ tập trung vào mục tiêu hoàn tất nốt bước cuối để thu hồi số tiền khổng lồ đã nạp.
6. Đầu tư cam kết lãi cao, chuyên gia dẫn dắt
Với nhóm lừa đảo sàn đầu tư chứng khoán, ngoại hối, quyền chọn nhị phân và tiền ảo, các báo chính thống và cổng thông tin công an chủ yếu tường thuật cơ cấu nhóm kín, danh xưng mồi nhử và khẩu hiệu cam kết lợi nhuận; chưa tìm thấy đoạn nhật ký chat "đọc lệnh" nhiều lượt nguyên văn dạng văn bản thuần trong nguồn dữ liệu công khai. Dưới đây là 3 mẫu thực tế thể hiện đầy đủ ngôn ngữ mời gọi và cơ chế dẫn dắt đã được ghi nhận.
Mẫu 6.1: Nhóm Zalo sàn ngoại hối ảo gần 1.000 thành viên cam kết 36%/tháng (06/2021)
Nguồn từ Báo Tuổi Trẻ / Người Lao Động. Theo ghi nhận từ trường hợp nhân vật B., nhóm Zalo có gần 1.000 thành viên với lịch trình có "chuyên gia đọc lệnh" mỗi ngày, đưa ra lời cam kết bảo hiểm 100% vốn và lợi nhuận lên tới 36%/tháng.
Thủ thuật tâm lý kết hợp thiên kiến phi rủi ro (Zero-Risk Bias: gắn nhãn bảo hiểm 100% vốn) với bằng chứng xã hội quy mô lớn (Social Proof: phòng chat gần 1.000 người tạo cảm giác mô hình đã được đông đảo nhà đầu tư kiểm chứng an toàn).
Mẫu 6.2: Mồi câu 150.000 đồng qua tin nhắn Zalo theo kịch bản đọc lệnh (10/2024)
Nguồn từ VnExpress, kết hợp khung quy trình cảnh báo của Công an tỉnh Tuyên Quang. Tác giả bài viết trên VnExpress ghi nhận sau những cuộc gọi chào mời đầu tư dễ dàng, đối tượng chuyển sang hướng dẫn tương tác qua tin nhắn ở Zalo theo kiểu đọc lệnh làm theo. Sau khi làm theo và nhận được 150 nghìn (tác giả dùng tiền này mua chân gà rút xương), người viết đã nhận diện đây là chiêu trò lừa đảo cũ. Đối chiếu với cảnh báo của Công an tỉnh Tuyên Quang, mô hình lập nhóm đầu tư này luôn cho rút lãi nhỏ ban đầu nhằm xây dựng lòng tin trước khi dụ nạp khoản tiền lớn.
Thủ thuật tâm lý dựa trên quy tắc đáp trả và điều kiện hóa niềm tin: khoản lãi thật 150.000 đồng chuyển thẳng vào tài khoản cá nhân đóng vai trò bằng chứng thực nghiệm ngắn hạn, làm giảm sự phòng bị trước bước yêu cầu nạp vốn lớn.
Mẫu 6.3: Hệ sinh thái phòng chat kín kiểu "Chuyên gia đọc lệnh, hotgirl tỉa nến"
Nguồn từ VnExpress, Bộ Khoa học và Công nghệ, Báo Tuổi Trẻ / Người Lao Động dẫn cảnh báo Bộ Công an, Báo Tuổi Trẻ / Người Lao Động (vụ dịch vụ đọc trộm tin nhắn/đọc lệnh) và Thế Giới Di Động.
Trong các phòng chat kín trên Zalo và Telegram, đối tượng đặt tên nhóm mỹ miều như "VIP", "đầu tư thông minh", "chiến lược đầu tư thông minh". Bên trong là hàng chục tài khoản ảo hoạt động sôi nổi, nhộn nhịp đọc lệnh và khoe thu nhập cao dưới các danh xưng như "chuyên gia đọc lệnh", "thợ đục sàn", "thầy" đọc lệnh, "hotgirl tỉa nến" và "nhà đầu tư thành công".
Thủ thuật tâm lý của kịch bản này dựa trên hiệu ứng buồng vọng thanh (Echo Chamber) kết hợp hiệu ứng hào quang (Halo Effect): khi toàn bộ môi trường trò chuyện chỉ phát đi tín hiệu thắng lệnh từ hình mẫu "chuyên gia" hoặc "hotgirl", tâm lý sợ bỏ lỡ cơ hội (FOMO) lấn át câu hỏi cốt lõi về tính hợp pháp và nguồn gốc thực của dòng tiền.
7. Trúng thưởng, nhận quà, đóng phí để nhận tiền
Nhóm lừa đảo trúng thưởng và nhận quà tập trung vào sự bất đối xứng giá trị: hứa hẹn món quà hoặc khoản tiền miễn phí rất lớn nhưng gài liên tiếp các loại phí (phí cược, thuế, phí hải quan, phí bảo hiểm, phí xác minh) ngay trước bước nhận hàng.
Mẫu 7.1: Tin nhắn thông báo gói hàng chứa tiền mặt bị hải quan Malaysia giữ (mất 740 triệu đồng)
Nguồn từ Báo Tuổi Trẻ. Nạn nhân nhận được tin nhắn từ một số máy tại Malaysia với thông báo nguyên văn:
"Hàng hóa của bạn bị hải quan Malaysia giữ do phát hiện tiền mặt trong gói hàng."
Từ thông báo này, nạn nhân bị dẫn dụ đóng nhiều lần tiền dẫn đến mất 740 triệu đồng. Thủ thuật tâm lý khai thác hiệu ứng suýt chạm đích kết hợp nỗi sợ rắc rối hải quan: việc kiện hàng bị chặn "vì có tiền mặt" đồng thời củng cố niềm tin món quà có thật và tạo áp lực phải đóng tiền ngay để giải phóng hàng.
Mẫu 7.2: Tin nhắn SMS trúng thưởng 5 triệu đồng và phí cược bằng thẻ cào điện thoại
Nguồn từ trang thuật ngữ Nghề Ngân hàng, Báo Tuổi Trẻ và Báo Công an nhân dân. Theo tổng hợp của trang Nghề Ngân hàng, chiến dịch phát tán SMS hàng loạt tại Hà Nội sử dụng mẫu tin nhắn nguyên văn:
"Chúc mừng quý khách đã trúng thưởng chương trình tri ân khách hàng của Ngân hàng B. Vui lòng truy cập link để nhận 5 triệu đồng."
Ngoài kênh SMS giả ngân hàng, Báo Công an nhân dân ghi nhận đối tượng còn dùng Facebook Messenger nhắn tin thông báo trúng xe máy, điện thoại, đồng hồ; còn Báo Tuổi Trẻ ghi nhận các vụ nhắn tin qua Zalo, Viber, Beetalk yêu cầu đóng phí cược 1,5 triệu đồng bằng thẻ cào điện thoại (có nạn nhân mất gần 100 triệu đồng). Thủ thuật tâm lý nằm ở việc kích hoạt sự phấn khích bất ngờ, làm gián đoạn phản xạ kiểm chứng nguồn gốc chương trình khuyến mãi.
Mẫu 7.3: Chuỗi đòi phí hải quan – bảo hiểm – chứng nhận lên tới 1,56 tỷ đồng (10/2023)
Nguồn từ Báo Tuổi Trẻ / Phụ Nữ TP.HCM, đối chiếu thêm các vụ án tương đồng trên Báo Dân Trí (cụ ông 85 tuổi suýt chuyển 52 triệu phí hải quan) và Báo Dân Trí (kiện hàng 1,2 triệu USD tại Nội Bài).
Trong vụ việc được Báo Phụ Nữ TP.HCM phản ánh tháng 10/2023, chị L.T.N.H. nhận thông báo có 1 thùng quà giá trị cao từ nước ngoài gửi về nhưng mắc lỗi "hàng trốn thuế". Đầu tiên, một phụ nữ tự xưng là hải quan Hà Nội yêu cầu chị nộp 38 triệu đồng vào tài khoản mang tên Bế Thị Ngọc. Tiếp theo, một người phụ nữ khác tên Thanh Tâm cũng xưng là nhân viên hải quan Hà Nội thông báo do số tiền gửi về quá lớn nên phải đóng tiếp 250 triệu đồng phí gửi tiền. Khi thấy chị H. làm theo, nhóm này tiếp tục dựng thêm "phí bảo hiểm" và "phí chứng nhận", khiến chị vay mượn chuyển tổng cộng 1,56 tỉ đồng.
Thủ thuật tâm lý của chuỗi tương tác nhiều đợt này là leo thang cam kết (Escalation of Commitment): khởi đầu bằng 38 triệu đồng để mở cánh cửa giao dịch, sau đó buộc nạn nhân đóng các khoản lớn hơn gấp nhiều lần nhằm bảo vệ những khoản tiền đã chuyển trước đó.
Mẫu 7.4: Bẫy kép "mở ngọc trai trúng thưởng" và giả danh công an thu phí lấy lại tiền (Quảng Ngãi)
Nguồn từ Báo Tuổi Trẻ. Một phụ nữ tại Quảng Ngãi tin quảng cáo "mở ngọc trai trúng thưởng" trên mạng nên đã chuyển 30 triệu đồng nhưng không nhận được quà. Khi nạn nhân tìm cách lấy lại tiền, đối tượng khác giả danh công an tiếp cận dụ nộp thêm "phí xác minh" để hoàn trả số tiền mất, rất may sự việc được ngăn chặn kịp thời.
Thủ thuật tâm lý ở vòng hai đánh trúng tâm lý khủng hoảng hậu mất tiền (Recovery Scam): nạn nhân đang hoang mang và muốn gỡ gạc nhanh chóng rất dễ tin vào bất kỳ cá nhân nào mạo danh công an hoặc luật sư hứa hỗ trợ thu hồi tài sản.
8. Lừa đảo tình cảm qua mạng
Lừa đảo tình cảm qua mạng (Romance Scam) thường kéo dài giai đoạn làm quen, chăm sóc tinh thần trước khi khai thác tài chính. Tại Việt Nam, mô hình cổ điển "tặng quà gửi tiền từ nước ngoài" (như đường dây của nhóm đối tượng Nigeria hoặc nhóm ngoại quốc từng bị triệt phá) đang song hành cùng các biến thể 2025–2026 trên Telegram như thừa kế tài sản mã hóa giả, "bẫy tình hàng triệu USDT" và tống tiền bằng hình ảnh nhạy cảm.
Mẫu 8.1: Vụ cụ bà 66 tuổi bán vàng gửi tiền cho "bạn trai ca sĩ" (11/2026)
Nguồn từ Báo Dân Trí (23/11/2026). Kẻ lừa đảo đóng giả làm ca sĩ tiếp cận người phụ nữ 66 tuổi, thường xuyên nhắn tin và nhanh chóng thiết lập cách xưng hô nguyên văn được ghi nhận là "vợ chồng, anh yêu, em yêu". Sau khi xây dựng được niềm tin, đối tượng dựng kịch bản gửi quà từ nước ngoài về để yêu cầu nạn nhân chuyển tiền, khiến cụ bà bán vàng gửi tiền cho "bạn trai".
Thủ thuật tâm lý sử dụng kỹ thuật tấn công tình cảm dồn dập (Love Bombing) kết hợp tạo danh phận gia đình giả ("vợ chồng") nhắm vào nhóm người cao tuổi thiếu người chia sẻ, biến các yêu cầu chuyển tiền thành trách nhiệm gắn bó tình cảm.
Mẫu 8.2: Vụ chị G. với "bạn trai ở Đức" hứa mua nhà 72 tỷ đồng và gửi nhẫn kim cương (10/2023)
Nguồn từ Báo Tuổi Trẻ / Phụ Nữ TP.HCM, đối chiếu cùng mô tả quy trình của Công an tỉnh Khánh Hòa và vụ án tương tự tại TP.HCM trên VnExpress.
Nắm bắt hoàn cảnh chị G. đã ly hôn và thiếu thốn tình cảm, đối tượng xưng tên Tuấn ngày nào cũng gọi điện tâm sự, ngỏ ý mang số tiền 3 triệu USD (khoảng 72 tỉ đồng) về mua nhà ở TP.HCM sống cùng chị và hứa tặng riêng 12 tỉ đồng nếu chị tìm giúp nhà. Đến đầu tháng 9, Tuấn báo đã gửi từ Đức về một thùng quà gồm tiền và nhẫn kim cương làm quà ra mắt, đồng thời dặn trước nếu hải quan có gọi yêu cầu gì thì chị cứ thực hiện theo. Ngay sau đó, một người tự xưng hải quan gọi điện đòi đóng 13 triệu đồng để nhận quà của bạn trai từ Đức, kéo theo nhiều đợt chuyển tiền lên tới gần 300 triệu đồng trước khi em gái chị G. kịp phát hiện ngăn chặn. Cơ quan điều tra xác định đường dây gồm 4 người do đối tượng ngoại quốc tên Don Smart cầm đầu. (Trong một vụ tương tự tại TP.HCM trên VnExpress, "người tình online" nhắn tin tặng quà 100.000 USD rồi đồng bọn đòi 80 triệu đồng phí hải quan).
Thủ thuật tâm lý của kịch bản này dựa trên vẽ tương lai lý tưởng (Future Faking: hứa hẹn cuộc sống sung túc với căn nhà 72 tỉ đồng) và đóng cặp "vai thiện – vai ác": "Tuấn" giữ vai người tình hào phóng vô điều kiện, còn "hải quan" đóng vai rào cản hành chính khách quan để giữ lòng tin tuyệt đối cho nhân vật người yêu.
Mẫu 8.3: Bẫy tình cảm kết hợp thừa kế tiền mã hóa trên web giả dxg.cc
Nguồn phản ánh cộng đồng trên Reddit r/vozforums. (Lưu ý: đây là tư liệu phản ánh từ diễn đàn cộng đồng mạng, chưa qua xác minh bằng hồ sơ tố tụng của cơ quan công an). Đối tượng tiếp cận qua Instagram, Messenger hoặc Telegram theo dạng romance scam kết hợp kịch bản người lạ sắp qua đời muốn tặng hàng triệu USD crypto, đồng thời yêu cầu giữ bí mật tuyệt đối. Chúng gửi thông tin để nạn nhân đăng nhập vào website giả (như domain dxg.cc), nơi hiển thị số dư rất lớn nhưng không tồn tại trên blockchain thật. Khi nạn nhân muốn rút tiền, trang web yêu cầu nộp phí gas, thuế, phí bảo hiểm, phí xác minh hoặc phí kích hoạt rút tiền bằng crypto hoặc tiền mặt thật.
Thủ thuật tâm lý cốt lõi là hiệu ứng sở hữu ảo (Endowment Effect): việc nhìn thấy số dư lớn hiển thị dưới tài khoản mình đang đăng nhập khiến nạn nhân có cảm giác số tài sản đó thuộc về mình, từ đó chấp nhận chuyển tiền đóng các khoản phí giả định; trong khi yêu cầu giữ bí mật giúp kẻ gian cô lập nạn nhân khỏi lời khuyên tỉnh táo từ bên ngoài.
Mẫu 8.4: Xu hướng "Bẫy tình hàng triệu USDT" (Pig Butchering) và tống tiền sinh viên (2025–2026)
Nguồn từ Báo Tuổi Trẻ (chuyên gia an ninh mạng Hiếu PC phân tích chiêu thức), Báo Tuổi Trẻ / Phụ Nữ, Báo Tuổi Trẻ / Người Lao Động và thảo luận người dùng về nền tảng Telegram trên Reddit r/TroChuyenLinhTinh.
Thay vì chỉ dùng chiêu gửi quà hải quan, giai đoạn 2025–2026 nổi lên mô hình tiếp cận giới trẻ hoặc người trưởng thành qua những tin nhắn quá thân mật, rồi điều hướng sang Telegram—nơi đối tượng có thể xóa toàn bộ tin nhắn và phòng chat chỉ trong tích tắc để tránh lưu dấu vết khi nạn nhân trình báo công an. Sau khi dẫn dụ thành công, kịch bản rẽ làm hai hướng: giả vờ yêu đương để dụ đầu tư tài chính, tiền ảo ("bẫy tình hàng triệu USDT"), hoặc dụ gửi ảnh riêng tư rồi đe dọa phát tán để tống tiền.
Thủ thuật tâm lý của biến thể này là gắn kết sự tin tưởng tình cảm với hành vi chuyển tiền đầu tư và chuyển dịch sang kênh ẩn danh khó truy vết, khiến nạn nhân vừa bị ràng buộc tình cảm vừa mất chứng cứ pháp lý sau khi đối tượng cắt liên lạc.
9. Đánh giá khoảng trống dữ liệu và hướng thu thập tiếp các bản ghi nguyên văn
Tổng hợp cả 8 nhóm cho thấy kịch bản ngôn ngữ lừa đảo tài chính tại Việt Nam vận hành theo một nhịp tâm lý chung: thiết lập danh tính quen thuộc hoặc uy quyền -> kích hoạt cảm xúc mạnh (sợ hãi, tham vọng, nể nang hoặc tình cảm) -> cô lập nạn nhân khỏi kênh kiểm chứng (cấm tiết lộ, xóa ứng dụng chat, che giấu nhân viên ngân hàng) -> điều hướng dòng tiền sang tài khoản lạ hoặc trang web thu thập OTP.
Tuy vậy, nếu mục tiêu của bạn là thu thập đủ 3–5 đoạn hội thoại nguyên văn dài 5–15 tin nhắn cho mỗi dạng (đặc biệt để huấn luyện mô hình phân loại văn bản lừa đảo tiếng Việt hoặc phân tích ngôn ngữ học), nguồn báo chí dạng chữ hiện mới đáp ứng tốt lớp câu mở đầu, lời thoại bẫy kỹ thuật và tóm tắt tiến trình. Để hoàn thiện bộ dữ liệu nguyên văn đa lượt (nhất là ở Nhóm 4 và Nhóm 6), quá trình thu thập bổ sung nên triển khai theo 4 kênh thực tế sau:
Trích xuất chữ bằng công cụ OCR từ các ảnh chụp màn hình đoạn chat Zalo, Messenger và SMS được báo chí hoặc công an nhúng trực tiếp trong bài viết (nhiều phóng sự trên Tuổi Trẻ, Tiền Phong, Thanh Niên và Lao Động lưu toàn văn tin nhắn trong ảnh minh họa thay vì chép ra text).
Thu thập trực tiếp từ các diễn đàn mở có thói quen chia sẻ ảnh chụp hoặc văn bản tin nhắn lừa đảo như r/vozforums, r/TroChuyenLinhTinh và tinhte.vn, đồng thời tiếp cận trực tiếp các group Facebook cảnh báo lừa đảo tại Việt Nam (vốn không xuất hiện qua tìm kiếm công khai do thiết lập nhóm kín).
Tham khảo các kênh tiếp nhận và tra cứu phản ánh lừa đảo cộng đồng như chongluadao.vn (nơi hướng dẫn chi tiết quy trình đính kèm ảnh chụp màn hình tin nhắn qua ứng dụng VNeID) và trangtrang.com (tổng hợp phản ánh cộng đồng theo từng đầu số lừa đảo).
Theo dõi định kỳ các bản tin cảnh báo an toàn thông tin của ngân hàng (Vietcombank, BIDV, VIB, Agribank) và Cục An toàn thông tin / VNCERT/CC vào các giai đoạn cao điểm phát tán chiến dịch SMS/Zalo giả mạo như dịp cận Tết, kỳ hoàn thuế hoặc khi triển khai thay đổi xác thực sinh trắc học.
Nguồn trích dẫn
1. Cảnh giác lừa đảo: Thủ đoạn giả danh công an yêu cầu chuyển tiền, https://tuoitre.vn/gia-danh-cong-an-goi-dien-lua-dao-yeu-cau-chuyen-tien-duoi-danh-nghia-chuyen-tien-dam-cuoi-20251110094657335.htm 2. Lật tẩy cuộc hội thoại giả danh công an lừa đảo người dân, https://laodong.vn/phap-luat/lat-tay-cuoc-hoi-thoai-gia-danh-cong-an-lua-dao-nguoi-dan-762839.ldo 3. Cảnh báo tin nhắn SMS mạo danh NAPAS với nhiều kịch bản lừa đảo khách hàng, https://tienphong.vn/canh-bao-tin-nhan-sms-mao-danh-napas-voi-nhieu-kich-ban-lua-dao-khach-hang-post1897021.tpo 4. Nhiều lãnh đạo sở bị hack Zalo, mạo danh vay tiền - Báo Tuổi Trẻ, https://tuoitre.vn/tu-vu-nhieu-lanh-dao-so-bi-hack-zalo-mao-danh-vay-tien-trach-nhiem-thuoc-ve-ai-khi-xay-ra-thiet-hai-100261116101336951.htm 5. Vì sao tội phạm lừa qua mạng vẫn hoành hành?: Sập bẫy vì thiếu, https://thanhnien.vn/vi-sao-toi-pham-lua-qua-mang-van-hoanh-hanh-sap-bay-vi-thieu-hieu-biet-thua-long-tham-1851497125.htm 6. Từ vụ 2 lãnh đạo sở bị hack Zalo, công an nhắc 'bài học cũ' về link, https://tuoitre.vn/tu-vu-2-lanh-dao-so-bi-hack-zalo-cong-an-nhac-bai-hoc-cu-ve-link-va-ma-qr-gia-mao-100261115102150087.htm 7. Ai có tài khoản ngân hàng cần cảnh giác: Xóa ngay tin nhắn Zalo, https://hangthat.thuonghieucongluan.com.vn/ai-co-tai-khoan-ngan-hang-can-canh-giac-xoa-ngay-tin-nhan-zalo-facebook-chua-link-la-a291782.html 8. Zalo một giám đốc sở ở Cà Mau bị hack, nhắn tin mượn tiền nhiều, https://www.24h.com.vn/tin-tuc-trong-ngay/zalo-mot-giam-doc-so-o-ca-mau-bi-hack-nhan-tin-muon-tien-nhieu-nguoi-c46a1751977.html 9. Cảnh báo lừa đảo qua Zalo - Chiếm quyển tài khoản & mượn tiền, https://ctsv.uit.edu.vn/bai-viet/phong-ngua-lua-dao-bai-8-canh-bao-lua-dao-qua-zalo-chiem-quyen-tai-khoan-muon-tien 10. Hai phó giám đốc sở ở Khánh Hòa bị hack Zalo, mạo danh nhắn tin, https://tuoitre.vn/hai-pho-giam-doc-so-o-khanh-hoa-bi-hack-zalo-mao-danh-nhan-tin-muon-tien-100261114213719946.htm 11. Nhiều lãnh đạo sở tại Cà Mau 'nhắn tin mượn tiền' do bị 'hack Zalo', https://tuoitre.vn/nhieu-lanh-dao-so-tai-ca-mau-nhan-tin-muon-tien-do-bi-hack-zalo-20260409101601759.htm 12. Lừa đảo qua mạng: Biến ảo khôn lường - Bài 2: Hiểm họa từ deepfake, https://mst.gov.vn/lua-dao-qua-mang-bien-ao-khon-luong-bai-2-hiem-hoa-tu-deepfake-197240703143958681.htm 13. Cảnh giác hack Facebook lừa chuyển tiền, tung hình ảnh nhạy cảm, https://vneconomy.vn/canh-giac-hack-facebook-lua-chuyen-tien-tung-hinh-anh-nhay-cam.htm 14. Cảnh giác với thủ đoạn hack Facebook nhắn tin mượn tiền, https://tuoitre.vn/nld/canh-giac-voi-thu-doan-hack-facebook-nhan-tin-muon-tien-196250221090235491.htm 15. Nghệ sĩ bị lừa tiền qua mạng xã hội - VnExpress, https://vnexpress.net/nghe-si-bi-lua-tien-qua-mang-xa-hoi-4088924.html 16. 5 kịch bản lừa đảo tinh vi dễ mất tiền tỷ: Cảnh giác với cuộc gọi giả, https://eva.vn/tin-tuc/5-kich-ban-lua-dao-tinh-vi-de-mat-tien-ty-canh-giac-voi-cuoc-goi-gia-danh-nhan-vien-dien-luc-tin-nhan-du-doi-diem-thuong-c73a689549.html 17. Loạt kịch bản lừa đảo mới: Không thể bỏ qua để tránh sập bẫy, https://vietnamnet.vn/nhung-kich-ban-lua-dao-moi-khien-nguoi-dan-mat-hang-ty-dong-2426699.html 18. Giả công an, viện kiểm sát đe dọa người nghe 'sắp bị bắt' yêu cầu, https://thanhnien.vn/gia-cong-an-vien-kiem-sat-de-doa-nguoi-nghe-sap-bi-bat-yeu-cau-mau-chuyen-tien-185895153.htm 19. Công an giả gọi điện lừa đảo, gặp đúng công an thật | Báo Dân trí, https://dantri.com.vn/phap-luat/cong-an-gia-goi-dien-lua-dao-gap-dung-cong-an-that-20230617210548887.htm 20. Bị/được công an gọi điện : r/vozforums - Reddit, https://www.reddit.com/r/vozforums/comments/1fhb55h/b%E1%BB%8B%C4%91%C6%B0%E1%BB%A3c_c%C3%B4ng_an_g%E1%BB%8Di_%C4%91i%E1%BB%87n/ 21. Nam sinh viên ở Hà Nội bị lừa hơn 7 tỷ qua video call giả danh công, https://vietnamnet.vn/nam-sinh-vien-o-ha-noi-bi-lua-hon-7-ty-qua-video-call-gia-danh-cong-an-2415705.html 22. Lừa đảo qua tin nhắn SMS là gì? Smishing - Việc làm ngân hàng, https://vieclam.nganhang.com/thuat-ngu/lua-dao-qua-tin-nhan-sms-la-gi 23. Mạo danh ngân hàng dụ người dùng xác thực sinh trắc học, https://vnexpress.net/chieu-mao-danh-ngan-hang-du-xac-thuc-sinh-trac-hoc-4764618.html 24. Bùng phát nhiều chiêu trò lừa đảo sau xác thực sinh trắc học, https://tuoitre.vn/bung-phat-nhieu-chieu-tro-lua-dao-sau-xac-thuc-sinh-trac-hoc-20240717230728303.htm 25. Tất cả người dân nhân tin nhắn có nội dung sau chú ý thông báo, https://cafef.vn/tat-ca-nguoi-dan-nhan-tin-nhan-co-noi-dung-sau-chu-y-thong-bao-moi-nhat-188261125074326733.chn 26. Xuất hiện tin nhắn giả mạo ngay trong luồng SMS chính thức của, https://kenh14.vn/xuat-hien-tin-nhan-gia-mao-ngay-trong-luong-sms-chinh-thuc-cua-mot-ngan-hang-cuc-an-ninh-mang-canh-bao-khan-215261022220354001.chn 27. Cảnh báo thủ đoạn giả mạo nhân viên ngân hàng hỗ trợ nâng cấp, https://ansinh.tapchikinhtetaichinh.vn/canh-bao-thu-doan-gia-mao-nhan-vien-ngan-hang-ho-tro-nang-cap-ung-dung-de-phat-tan-ma-doc-162769.html 28. NAPAS phát cảnh báo tới người dùng ngân hàng: Một tin nhắn tưởng như nhận ưu đãi có thể là cái bẫy đánh cắp tiền trong tài khoản, https://cafebiz.vn/napas-phat-canh-bao-toi-nguoi-dung-ngan-hang-mot-tin-nhan-tuong-nhu-nhan-uu-dai-co-the-la-cai-bay-danh-cap-tien-trong-tai-khoan-176261126122508535.chn 29. Lừa đảo ngân hàng - Tin tức mới nhất 24h qua - Báo VnExpress, https://vnexpress.net/tag/lua-dao-ngan-hang-896009 30. Xác minh khi sếp nhắn nhờ chuyển khoản gấp — Bảo Mật SI - BaoMat, https://baomat.si/quy-trinh-xac-minh-yeu-cau-chuyen-khoan-gap-trong-cong-ty 31. Lừa đảo giả mạo email doanh nghiệp (BEC) và cách xác minh, https://trungtamthongtin.com/lua-dao-gia-mao-email-doanh-nghiep-bec 32. Giả danh nhà cung cấp, đối tác để đổi số tài khoản nhận tiền, https://antoantaichinh.vn/thu-vien/gia-danh-nha-cung-cap-doi-tac-doi-tai-khoan/ 33. Nữ kế toán làm giả lệnh chuyển khoản 3 tỷ đồng cho sếp duyệt, bất, https://kenh14.vn/nu-ke-toan-lam-gia-lenh-chuyen-khoan-3-ty-dong-cho-sep-duyet-bat-ngo-duoc-khen-thuong-215240808142133854.chn 34. Nghe sếp yêu cầu, nữ kế toán chuyển tiền 9 lần cho khách, đến lần, https://cafef.vn/nghe-sep-yeu-cau-nu-ke-toan-chuyen-tien-9-lan-cho-khach-den-lan-thu-10-moi-phat-hien-bat-thuong-canh-sat-vao-cuoc-thu-hoi-3-ty-dong-trong-8-phut-188240516150244562.chn 35. Nữ kế toán chuyển khoản 700.000 USD cho tên lừa đảo, sếp bất, https://nguoiquansat.vn/nu-ke-toan-chuyen-khoan-700-000-usd-cho-ten-lua-dao-sep-bat-ngo-khen-thuong-truoc-toan-cong-ty-vi-sao-178034.html 36. Kỹ Năng Thuyết Trình Về Deepfake: Nhận Diện & Phòng Tránh Lừa, https://www.studocu.vn/vn/document/truong-dai-hoc-khoa-hoc-xa-hoi-va-nhan-van/ky-nang-viet-truyen-thong/ky-nang-thuyet-trinh-ve-deepfake-nhan-dien-phong-tranh-lua-dao-b23dctt027/130161374 37. Phishing Email là gì? 11 chiêu trò lừa đảo và cách phòng chống, https://mso.vn/phishing-email-la-gi-cach-ngan-chan-phishing-email/ 38. Giả lãnh đạo lừa mượn tiền đồng nghiệp, người quen qua mạng xã, https://cand.vn/gia-lanh-dao-lua-muon-tien-dong-nghiep-nguoi-quen-qua-mang-xa-hoi-post662321.html 39. Sập bẫy 'làm nhiệm vụ, nhận tiền hoa hồng' - Báo Tuổi Trẻ, https://tuoitre.vn/sap-bay-lam-nhiem-vu-nhan-tien-hoa-hong-2022080508001051.htm 40. Tuyên án 7 người sang Campuchia lừa đảo, lộ thủ đoạn chiếm đoạt, https://tuoitre.vn/tuyen-an-7-nguoi-sang-campuchia-lua-dao-lo-thu-doan-chiem-doat-tien-cua-app-tinh-yeu-100260623202143162.htm 41. Công an phường Yên Sơn cảnh báo chiêu trò “việc nhẹ, lương cao, https://congan.ninhbinh.gov.vn/cong-an-phuong-yen-son-canh-bao-chieu-tro-viec-nhe-luong-cao-tren-mang-xa-hoi-trong-dip-he 42. Cảnh báo thủ đoạn lừa đảo bằng hình thức tuyển cộng tác viên xử, https://congan.haiphong.gov.vn/Tin-An-ninh-trat-tu/Canh-bao-thu-doan-lua-dao-bang-hinh-thuc-tuyen-cong-tac-vien-xu-ly-don-hang-cho-cac-trang-thuong-mai-dien-tu-171717.html 43. Lại rộ tin nhắn lừa đảo mời chào làm việc thu nhập 30 triệu đồng, https://www.thegioididong.com/tin-tuc/lai-ro-tin-nhan-lua-dao-moi-chao-lam-viec-thu-nhap-cao-1436352 44. Công an tỉnh Nghệ An: Giăng lưới bắt “lừa” - Công an Nhân dân, https://cand.vn/cong-an-tinh-nghe-an-giang-luoi-bat-lua-post773666.html 45. Quả đắng sàn ngoại hối ảo: Khá dễ nhận biết "mùi" lừa đảo, https://tuoitre.vn/nld/kinh-te/qua-dang-san-ngoai-hoi-ao-kha-de-nhan-biet-mui-lua-dao-20210624223956612.htm 46. Tôi nhận ra ngay lừa đảo khi nhận những cuộc gọi đầu tư dễ dàng, https://vnexpress.net/toi-nhan-ra-ngay-lua-dao-khi-nhan-nhung-cuoc-goi-dau-tu-de-dang-4807266.html 47. CẢNH BÁO 30 KỊCH BẢN LỪA ĐẢO TRỰC TUYẾN PHỔ BIẾN HIỆN, https://congan.tuyenquang.gov.vn/vi/tin-bai/canh-bao-30-kich-ban-lua-dao-truc-tuyen-pho-bien-hien-nay?type=NEWS&id=240857 48. Quảng cáo cung cấp dịch vụ đọc trộm tin nhắn, 2 thanh niên lừa tiền, https://tuoitre.vn/nld/quang-cao-cung-cap-dich-vu-doc-trom-tin-nhan-2-thanh-nien-lua-tien-hang-chuc-nguoi-19624090219220061.htm 49. Cảnh báo lừa đảo khi tham gia sàn đầu tư tài chính trực tuyến, https://mst.gov.vn/canh-bao-lua-dao-khi-tham-gia-san-dau-tu-tai-chinh-truc-tuyen-1972412161001558.htm 50. Cách nhận diện 'bẫy' đầu tư thời 4.0 - Báo VnExpress Kinh doanh, https://vnexpress.net/cach-nhan-dien-bay-dau-tu-thoi-4-0-4920186.html 51. Cảnh giác trước các tin nhắn, cuộc gọi dụ dỗ đầu tư chứng khoán, https://www.thegioididong.com/tin-tuc/canh-giac-tin-nhan-cuoc-goi-du-do-dau-tu-chung-khoan-1471755 52. Cảnh báo chiêu lừa "phạt nguội 50.000 VND" qua website giả dịch, https://tuoitre.vn/nld/canh-bao-chieu-lua-phat-nguoi-50000-vnd-qua-website-gia-dich-vu-cong-196260427172736312.htm 53. Đừng ham lãi khủng, làm ít được nhiều từ các bẫy lừa tiền qua mạng, https://tuoitre.vn/dung-ham-lai-khung-lam-it-duoc-nhieu-tu-cac-bay-lua-tien-qua-mang-20250410225714262.htm 54. Bị lừa đảo 'mở ngọc trúng tưởng', lại suýt mất thêm tiền vì công an giả, https://tuoitre.vn/bi-lua-dao-mo-ngoc-trung-tuong-lai-suyt-mat-them-tien-vi-cong-an-gia-100261031125314657.htm 55. Lại nở rộ lừa đảo tặng quà từ nước ngoài - Báo Tuổi Trẻ, https://tuoitre.vn/phunuonline/lai-no-ro-lua-dao-tang-qua-tu-nuoc-ngoai-1101502888.htm 56. ​Sập bẫy chiêu lừa tặng quà qua facebook, mất 740 triệu đồng, https://tuoitre.vn/sap-bay-chieu-lua-tang-qua-qua-facebook-mat-740-trieu-dong-947628.htm 57. Cảnh giác trúng thưởng khi online trên mạng - Báo Tuổi Trẻ, https://tuoitre.vn/than-trong-doi-song-mang-755871.htm 58. Cảnh báo 8 thủ đoạn lừa đảo qua mạng xã hội - Công an Nhân dân, https://cand.vn/canh-bao-8-thu-doan-lua-dao-qua-mang-xa-hoi-post654059.html 59. Công an phát thông báo quan trọng đến những ai nhận được tin nhắn SMS, Zalo, Facebook, Email có nội dung này, https://eva.vn/tin-tuc/cong-an-phat-thong-bao-quan-trong-den-nhung-ai-nhan-duoc-tin-nhan-sms-zalo-facebook-email-co-noi-dung-nay-c73a689921.html 60. "Cháu bên nước ngoài" yêu cầu ông chuyển 52 triệu đồng phí nhận, https://dantri.com.vn/phap-luat/chau-ben-nuoc-ngoai-yeu-cau-ong-chuyen-52-trieu-dong-phi-nhan-qua-20250304161433791.htm 61. Ham "đồ ngoại, quà khủng"..., hàng loạt phụ nữ sập bẫy lừa đảo, https://dantri.com.vn/phap-luat/ham-do-ngoai-qua-khung-hang-loat-phu-nu-sap-bay-lua-dao-20170303072524678.htm 62. Cảnh báo hàng loạt chiêu trò mạo danh NAPAS và ngân hàng để lừa đảo, https://baocaovien.vn/tin-tuc/canh-bao-hang-loat-chieu-tro-mao-danh-napas-va-ngan-hang-de-lua-dao/434928.html 63. Cảnh giác thủ đoạn lừa đảo mạo danh người nước ngoài làm quen, https://congan.khanhhoa.gov.vn/vi/canh-giac-thu-doan-lua-dao-mao-danh-nguoi-nuoc-ngoai-lam-quen-qua-mang-xa-hoi-gui-qua-tu-nuoc-ngoai 64. Nhóm người nước ngoài lừa 'tặng quà 100.000 USD' bị bắt ở Sài Gòn, https://vnexpress.net/nhom-nguoi-nuoc-ngoai-lua-tang-qua-100-000-usd-bi-bat-o-sai-gon-3381606.html 65. 5.000 vụ 'lừa đảo tình cảm' qua mạng từ nhóm Nigeria tới người, https://vnexpress.net/5-000-vu-lua-dao-tinh-cam-qua-mang-tu-nhom-nigeria-toi-nguoi-dung-viet-4851072.html 66. Chuyên gia an ninh mạng Hiếu PC vạch trần chiêu thức 'bẫy tình, https://tuoitre.vn/chuyen-gia-an-ninh-mang-hieu-pc-vach-tran-chieu-thuc-bay-tinh-hang-trieu-usdt-moi-100260713161653149.htm 67. Hình thức lừa đảo mx hả cả nhà : r/vozforums - Reddit, https://www.reddit.com/r/vozforums/comments/1wvsyp9/h%C3%ACnh_th%E1%BB%A9c_l%E1%BB%ABa_%C4%91%E1%BA%A3o_mx_h%E1%BA%A3_c%E1%BA%A3_nh%C3%A0/ 68. Giới trẻ thành “mồi ngon” của tin giả, lừa đảo thời AI - Báo Tuổi Trẻ, https://tuoitre.vn/nld/gioi-tre-thanh-moi-ngon-cua-tin-gia-lua-dao-thoi-ai-196251106145902599.htm 69. Người phụ nữ 66 tuổi bán vàng gửi tiền cho "bạn trai ca sĩ" - Dân trí, https://dantri.com.vn/phap-luat/nguoi-phu-nu-66-tuoi-ban-vang-gui-tien-cho-ban-trai-ca-si-20261123140443990.htm 70. Giải mã “ma trận” lừa đảo trên không gian mạng - Báo Tuổi Trẻ, https://tuoitre.vn/phunuonline/giai-ma-ma-tran-lua-dao-tren-khong-gian-mang-a1565098.html 71. sao toàn rủ lên telegram vậy : r/TroChuyenLinhTinh - Reddit, https://www.reddit.com/r/TroChuyenLinhTinh/comments/zikaxt/sao_to%C3%A0n_r%E1%BB%A7_l%C3%AAn_telegram_v%E1%BA%ADy/ 72. LỪA ĐẢO ZALO : r/vozforums - Reddit, https://www.reddit.com/r/vozforums/comments/1caf4zb/l%E1%BB%ABa_%C4%91%E1%BA%A3o_zalo/ 73. Đang rộ lên trò lừa chiếm đoạt tài khoản FB rồi đi mượn tiền, các, https://tinhte.vn/thread/dang-ro-len-tro-lua-chiem-doat-tai-khoan-fb-roi-di-muon-tien-cac-kieu.3675776/ 74. Công an vừa gọi điện cho mình, này có phải lừa đảo? - Reddit, https://www.reddit.com/r/vozforums/comments/1jg59xi/c%C3%B4ng_an_v%E1%BB%ABa_g%E1%BB%8Di_%C4%91i%E1%BB%87n_cho_m%C3%ACnh_n%C3%A0y_c%C3%B3_ph%E1%BA%A3i_l%E1%BB%ABa_%C4%91%E1%BA%A3o/ 75. 0393895706: Một nhận xét cảnh báo lừa đảo, mạo danh - Trang Trắng, https://www.trangtrang.com/0393895706.html 76. Báo lừa đảo qua VNeID: 5 bước đơn giản ai cũng làm được, https://chongluadao.vn/blog/2026/10/bao-lua-dao-qua-vneid-5-buoc-don-gian-ai-cung-lam-duoc/ 77. Những hình thức lừa đảo qua mạng nhắm vào giới trẻ, https://giaoducthoidai.vn/nhung-hinh-thuc-lua-dao-qua-mang-nham-vao-gioi-tre-post707175.html 78. VIB cảnh báo tin nhắn giả mạo ngân hàng - Báo điện tử Công lý, https://congly.vn/vib-canh-bao-tin-nhan-gia-mao-ngan-hang-544597.html 79. Giả tin nhắn thương hiệu Ngân hàng - thủ đoạn mới cần phòng ngừa, https://www.agribank.com.vn/vn/ve-agribank/tin-tuc-su-kien/tin-ve-agribank/agribank-thong-bao/gia-tin-nhan-thuong-hieu-ngan-hang-thu-doan-moi-can-phong-ngua

[TABLE 1]
Nhóm lừa đảo | Số mẫu thực tế | Tình trạng dữ liệu nguyên văn trong nguồn công khai | Nền tảng tiếp cận chính | Thủ thuật tâm lý cốt lõi
1. Giả danh người thân xin chuyển tiền gấp | 4 | Có 2 tin nhắn Zalo nguyên văn, 1 câu đính chính và 1 câu thoại Deepfake; vụ còn lại ghi nhận chuỗi diễn biến | Zalo, Facebook Messenger, cuộc gọi video | Nể nang quan hệ quen biết, áp lực khẩn cấp, ngụy biện kỹ thuật
2. Giả danh công an, tòa án điều tra rửa tiền | 4 | Có trích đoạn hội thoại gọi điện và lời thoại bộc phát khi bị lộ; các vụ "bắt cóc online" tường thuật theo tiến trình | Điện thoại, Zalo video call, Zoom | Gây sốc uy quyền, cô lập xã hội, ép nói dối nhân viên ngân hàng
3. Giả danh ngân hàng yêu cầu xác minh tài khoản | 4 | Có 3 mẫu SMS lừa đảo nguyên văn (từ trang thuật ngữ ngành ngân hàng) và mô tả kịch bản chèn luồng SMS Brandname, sinh trắc học | SMS Brandname giả, Zalo, website giả, file APK | Sợ mất quyền tài khoản, tin cậy luồng SMS thật, lúng túng công nghệ
4. Giả danh sếp, đồng nghiệp nhờ chuyển tiền đối tác | 4 | Có tin nhắn Zalo mượn tiền từ tài khoản lãnh đạo sở, lời dặn chuyển tiền trước giờ chốt hóa đơn và 1 câu mẫu minh họa đào tạo | Nhóm chat nội bộ giả, Zalo, email doanh nghiệp (BEC) | Thiên kiến phục tùng cấp trên, đồng thuận nhóm giả lập, áp lực hạn chót
5. Mời việc nhẹ lương cao, làm nhiệm vụ nạp tiền | 4 | Có tin nhắn tuyển dụng iMessage nguyên văn, đoạn mở đầu nhiệm vụ 1 và bảng nâng cấp 6 cấp độ VIP | iMessage, Facebook, Telegram, ứng dụng giả | Thỏa mãn tức thời ban đầu, bẫy chi phí chìm, cô lập nhóm 4 người
6. Đầu tư cam kết lãi cao, chuyên gia dẫn dắt | 3 | Không có đoạn chat đọc lệnh nhiều lượt nguyên văn dạng chữ; có cam kết lãi, danh xưng mồi nhử và cơ chế rút lãi nhỏ ban đầu | Nhóm kín Zalo, Telegram | Ảo tưởng phi rủi ro, buồng vọng thanh đám đông ảo, hiệu ứng FOMO
7. Trúng thưởng, nhận quà, đóng phí để nhận tiền | 4 | Có tin nhắn thông báo giữ hàng hải quan, SMS trúng thưởng nguyên văn và chuỗi đòi phí leo thang nhiều đợt | SMS, Facebook Messenger, điện thoại xưng hải quan | Hiệu ứng suýt chạm đích, leo thang cam kết qua từng loại phí
8. Lừa đảo tình cảm qua mạng | 4 | Có cách xưng hô nguyên văn và chuỗi tương tác từ làm quen đến gửi quà hoặc dụ nạp phí crypto trên web giả | Facebook, Instagram, Messenger, Telegram | Dội bom tình cảm, vẽ tương lai giả, hiệu ứng sở hữu số dư ảo
