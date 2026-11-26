# Đề xuất làm giàu bản đồ 40 thủ thuật (tactics_map.json)

> File ĐỀ XUẤT, chưa áp dụng vào `tactics_map.json`. Người duyệt copy từng mục.
> Nguồn đối chiếu: `ai/data/_gemini_raw.md` (Phần I Claude + Phần II Gemini). Ví dụ mới chỉ **lấy cảm hứng**, đã diễn đạt lại, không chép nguyên văn nguồn.
> Ràng buộc đã giữ: KHÔNG đổi `id`, `name`, `group`; không thêm/bớt thủ thuật; 6 nhóm A–F giữ nguyên.

## 0. Cách đọc và lưu ý trước khi áp dụng

**Quy ước mỗi mục:** `T__: sửa gì → nội dung mới`. Mục nào ghi "thay toàn bộ" thì thay cả mảng/chuỗi cũ bằng bản mới (bản mới đã gồm các phần cũ còn dùng được). Nhãn ưu tiên: **[P1]** sửa nhiều, ảnh hưởng độ chính xác, nên áp dụng trước. **[P2]** làm giàu nhẹ, áp dụng được thì tốt.

**Lưu ý kỹ thuật (đọc `ai/scripts/build_prompt.py`):** `signals` được ghép vào prompt dạng `"a", "b", "c"` làm gợi ý cho LLM, không phải regex. Vì vậy:
1. Trong chuỗi **không dùng dấu nháy kép `"`** (sẽ vỡ định dạng prompt). Đề xuất dưới đây đã tránh.
2. Mỗi `example_vi` cũng được bọc trong nháy kép, nên chỉ dùng nháy đơn hoặc không dùng nháy.
3. Mỗi thủ thuật để khoảng 8–12 signals để prompt không phình (40 × 12 ≈ 480 cụm). LLM tự hiểu không dấu và teencode, nên chỉ thêm các biến thể không dấu **có thật trong nguồn** hoặc rất phổ biến, không nhân đôi mọi cụm.
4. Sau khi áp dụng chạy `py ai/scripts/build_prompt.py` rồi `py ai/scripts/check_contract.py`.

**Cảnh báo false positive (quan trọng với tập legit):** `test_messages.json` có tin hợp lệ `dev-003` chứa "chuyển chị liền", "không gấp đâu", "chia 3". Các signal quá chung như `ngay`, `liền`, `yên tâm`, `hợp đồng`, `biên lai`, `mật khẩu`, `nhiệm vụ`, `tài khoản` dễ làm LLM gắn nhãn nhầm tin hợp lệ. Đề xuất bỏ `ngay`, `liền` khỏi T01 và thêm câu "phân biệt với tin hợp lệ" vào description của T01, T36, T38. Các signal chung khác chỉ nên đi kèm ngữ cảnh (ví dụ `hợp đồng đầu tư gửi qua Zalo` thay cho `hợp đồng`).

**Kiểm tra trùng test:** `test_messages.json` hiện có 3 tin (dev-001 giả cha bị giữ ở đồn; dev-002 tuyển CTV Shopee nạp 300k; dev-003 chia tiền điện). Tất cả `example_vi` mới bên dưới đã rà, không trùng nguyên văn hay gần nguyên văn. Hai example cũ **gần trùng** test và nên thay: **T23** ("Việc nhẹ tại nhà, chỉ cần điện thoại, 500k-1tr mỗi ngày" giống dev-002 "tại nhà, 500k-800k/ngày") và **T06** (cùng motif người thân mượn máy người khác nhắn xin tiền như dev-001). Khi Khánh thêm test mới nhớ rà lại với example.

**Phân biệt cặp dễ nhầm (làm rõ trong description):**
- T03 (hậu quả hành chính/tài sản: khoá, phạt, mất tiền, bị loại khỏi nhóm) khác T17 (nỗi sợ nhân thân: bị bắt, tạm giam, lộ ảnh, hại người nhà). Hiện `bị bắt` nằm ở cả hai, đề xuất để `bị bắt` ở T17.
- T13 (dặn giữ bí mật) khác T16 (dựng khủng hoảng để nạn nhân tự xử lý một mình) khác T14 (chặn việc kiểm tra lại người gửi).
- T24 (báo trúng thưởng) khác T40 (đòi phí sau đó). T25 (hứa hoàn) khác T40.

---

## A. Thúc ép tâm lý (T01–T05)

### T01 [P1]: sửa signals, description, example_vi
- description → `Ép nạn nhân làm hoặc chuyển ngay, không cho thời gian suy nghĩ, hỏi lại hay hỏi người khác; thường kèm mốc ngắn (vài phút, 30 phút) hoặc gọi/nhắn dồn dập nếu chưa trả lời. Chỉ tính khi người gửi ép người nhận; người nhận tự nói chuyển liền cho một khoản hợp lệ, hoặc câu không gấp đâu, không phải thủ thuật này.`
- signals (thay toàn bộ) → `["có việc gấp", "gấp lắm", "nhanh lên", "ngay bây giờ", "trong 5 phút", "trong 30 phút", "không kịp", "trễ là hỏng", "gọi lại ngay", "chuyen gap"]`
- example_vi → `Em nhanh giúp anh nha, 10 phút nữa là bên đó đóng giao dịch rồi, chưa chuyển là mất cọc luôn`
- Lý do: bỏ `ngay`, `liền` (khớp tin hợp lệ dev-003). Thêm "gọi dồn dập sau 5 phút" (nguồn 1.4 Đồng Hới).

### T02 [P1]: sửa description, signals, example_vi
- description → `Đặt mốc giờ hoặc ngày cụ thể do kẻ gian bịa (trước 17h, trong 12 giờ, hôm nay là hạn cuối, 21 giờ hệ thống ngưng) kèm hậu quả nếu quá hạn: khoá tài khoản, mất điểm, mất tiền đã nạp.`
- signals (thay toàn bộ) → `["trước 17h", "trong vòng 12 giờ", "trong hai giờ", "hôm nay là hạn cuối", "hết hạn", "điểm sắp hết hạn", "21 giờ hệ thống ngưng", "quá 30 phút", "đêm nay"]`
- example_vi → `Điểm thưởng của quý khách sẽ hết hạn lúc 23h59 đêm nay, vui lòng đổi quà qua đường link bên dưới kẻo mất`
- Lý do: nguồn 3.1, 3.2, 3.4, 5.1, 5.2, 4.3 (hạn "17 giờ xuất hóa đơn").

### T03 [P1]: sửa description, signals, example_vi
- description → `Doạ hậu quả hành chính hoặc tài sản nếu không làm theo: khoá hoặc phong toả tài khoản, bị phạt, mất số tiền đã nạp, bị loại khỏi nhóm, bị khởi kiện. (Nỗi sợ về bản thân như bị bắt, tạm giam thuộc T17.)`
- signals (thay toàn bộ) → `["sẽ bị khoá", "tạm khoá tài khoản", "phong toả tài khoản", "bị phạt", "mất toàn bộ số tiền đã nạp", "mời ra khỏi nhóm", "khởi kiện", "tai khoan bi khoa"]`
- example_vi → `Nếu chị không chuyển phần còn thiếu thì số tiền đã nạp sẽ bị đóng băng, chị cũng bị mời ra khỏi nhóm luôn`
- Lý do: nguồn 5.3 ("muốn lấy lại phải nạp thêm, nếu không sẽ mời ra khỏi nhóm"), bỏ chồng lấn `bị bắt` với T17.

### T04 [P2]: sửa signals, example_vi
- signals (thay toàn bộ) → `["suất cuối", "chỉ còn 2 suất", "số lượng có hạn", "hết suất", "slot cuối", "chốt luôn", "người khác lấy mất", "hôm nay thôi"]`
- example_vi → `Còn đúng 1 slot cuối trong nhóm VIP, hôm nay thôi, chị không vào là nhường người khác nha`
- Lý do: thêm teencode `slot`, phù hợp nhóm đầu tư/VIP.

### T05 [P1]: sửa description, signals, example_vi
- description → `Xin ít trước rồi nâng dần số tiền hoặc yêu cầu; sau mỗi lần nạn nhân chuyển lại có khoản mới với tên gọi khác (phí vận chuyển, rồi thuế, rồi bảo hiểm, rồi chứng nhận) hoặc nhờ đơn ship lần hai, lần ba. Thường giữ chân bằng việc nói đây là lần cuối.`
- signals (thay toàn bộ) → `["thêm chút nữa", "lần cuối", "bù thêm", "còn thiếu", "phí tiếp theo", "đơn ship lần hai", "nạp thêm mới rút được", "đóng thêm"]`
- example_vi → `Bạn ơi đơn ship lần hai nè, chuyển giúp mình 180k trả shipper, tí mình hoàn cả hai lần luôn`
- Lý do: nguồn 1.4 (hơn 80 học sinh bị nhờ lần hai, lần ba), 7.3, 7.6 (leo thang phí).

---

## B. Mạo danh và uy quyền (T06–T12)

### T06 [P1]: sửa description, signals, example_vi
- description → `Mạo nhận người thân hoặc bạn bè qua số lạ (đổi số mới), tài khoản giả cùng ảnh và tên, hoặc tài khoản Zalo/Facebook thật đã bị chiếm. Dấu hiệu: tin ngắn, mở bằng câu dò số dư (còn dư không), nhờ chuyển vào số của người khác, kèm lý do vì sao tự mình không chuyển được (thẻ lỗi, app đang lỗi) và hứa trả rất sớm (sáng mai, tối nay).`
- signals (thay toàn bộ) → `["số mới của mẹ", "mẹ đây", "em đây", "đổi số rồi", "tài khoản đang lỗi", "thẻ đang bị lỗi", "còn dư không", "cho mượn", "có tí việc", "sáng mai gởi lại", "ko", "k0"]`
- example_vi → `Zalo chị mới đổi số, em lưu lại nha. Thẻ chị đang lỗi, em ứng giúp chị 6 triệu, chiều mai chị chuyển lại`
- Lý do: example cũ (mượn máy cô Lan) gần motif dev-001. Các cụm `có tí việc`, `sáng mai gởi lại`, `tài khoản đang lỗi`, `ko`/`k0`, `còn dư không` đều có thật trong nguồn 1.2, 1.3, 4.2, 1.1/1.2 Gemini.

### T07 [P1]: sửa description, signals, example_vi
- description → `Mạo danh công an, viện kiểm sát, toà án, thuế, BHXH, bưu điện hoặc hải quan, thường qua cuộc gọi, video Zalo/Zoom: mặc sắc phục, đọc đúng họ tên, CCCD, số BHXH, dựng cáo buộc rửa tiền, ma tuý hoặc căn cước bị dùng mở thẻ, gửi lệnh bắt giả. Hay gán vụ cho công an tỉnh khác để bắt làm việc online thay vì đến trực tiếp, và từ chối cho nạn nhân nói chuyện với người thân hay công an địa phương.`
- signals (thay toàn bộ) → `["công an", "viện kiểm sát", "toà án", "lệnh bắt", "đường dây rửa tiền", "ma tuý", "căn cước của anh bị", "điều tra viên", "làm việc online qua Zoom", "kết bạn Zalo để xác minh", "bưu phẩm bị giữ", "cong an"]`
- example_vi → `Căn cước của anh đang bị dùng mở thẻ ngân hàng trong một vụ rửa tiền ở Hải Phòng, anh vào Zoom làm việc với điều tra viên ngay`
- Lý do: nguồn 2.1–2.4 (Claude), 2.1–2.4 (Gemini: Zoom, kết bạn Zalo, gán vụ cho tỉnh khác 2.2).

### T08 [P1]: sửa description, signals, example_vi
- description → `Mạo danh nhân viên ngân hàng hoặc tổng đài CSKH: SMS brandname giả (kể cả chèn vào chung luồng tin nhắn thật của ngân hàng, hay không dấu), hoặc cuộc gọi mời nâng hạn mức, hoàn phí, nâng cấp app, xác thực sinh trắc. Thường xin 4 số cuối thẻ rồi tới OTP; link có tên ngân hàng nhưng tên miền lạ (đuôi .top, có chữ secure, update).`
- signals (thay toàn bộ) → `["nâng hạn mức", "tạm khoá tài khoản", "đăng nhập trên thiết bị khác", "điểm thưởng sắp hết hạn", "hỗ trợ nâng cấp ứng dụng", "cập nhật thông tin thẻ", "xác thực sinh trắc học", "4 số cuối của thẻ", "tai khoan cua quy khach", "vui long dang nhap"]`
- example_vi → `BIDV: Tai khoan cua quy khach co giao dich bat thuong, vui long xac thuc sinh trac hoc tai bidv-update.top truoc 22h hom nay`
- Lý do: example cũ ("Vietcombank thông báo cập nhật thông tin") quá chung; bản mới có không dấu, tên miền lạ, hạn chót (nguồn 3.1, 3.3, 3.4 Claude; 3.1, 3.4 Gemini).

### T09 [P2]: sửa description, signals, example_vi
- description → `Mạo danh sàn thương mại điện tử (Shopee, Tiki, Lazada), ví điện tử, đơn vị vận chuyển hoặc dịch vụ công: đơn hàng lỗi thanh toán, kiện hàng bị giữ, xác nhận đơn hàng kèm file .apk, nhờ chuyển tiền trả shipper rồi hứa hoàn, phạt nguội giả.`
- signals (thay toàn bộ) → `["đơn hàng của bạn", "đơn hàng lỗi", "kiện hàng đang bị giữ", "trả shipper", "xác nhận đơn hàng", "file .apk", "phạt nguội", "mã vận đơn", "hoàn tiền đơn lỗi", "ví của bạn"]`
- example_vi → `Kiện hàng của bạn đang bị giữ ở kho do sai địa chỉ, bấm link cập nhật trong 24h để không bị hoàn về`
- Lý do: nguồn 3.3 Gemini (SMS đơn hàng kèm .apk, SpyNote), 1.4 (shipper), ref phạt nguội.

### T10 [P1]: sửa description, signals, example_vi
- description → `Mạo nhận cấp trên hoặc đồng nghiệp (Zalo của lãnh đạo bị hack hoặc tài khoản giả dùng ảnh và số lấy từ cổng thông tin cơ quan): xã giao rồi nhờ chút việc, mượn hoặc tạm ứng số tròn, bảo chuyển cho đối tác, đổi số tài khoản nhận thanh toán sát hạn hoá đơn, kéo kế toán vào nhóm chat có sếp giả, có khi chuyển tiền thật trước rồi bảo chuyển tiếp qua QR. Né gọi video.`
- signals (thay toàn bộ) → `["sếp đây", "anh đang họp", "anh nhờ chút việc", "tạm ứng", "chuyển giúp anh cho đối tác", "tài khoản còn đủ 30 triệu", "có tí việc", "đổi số tài khoản đối tác", "chuyển trước 17h", "chưa cần báo lại"]`
- example_vi → `Kế toán chú ý, hợp đồng với bên Phát Đạt đổi số tài khoản nhận từ hôm nay, em chuyển đợt này trước 17h kẻo trễ hoá đơn, chưa cần báo lại anh`
- Lý do: nguồn 4.1–4.3 (Claude) và 4.1–4.4 (Gemini). Example cũ chỉ có kịch bản đang họp; bản mới bắt biến thể BEC đổi tài khoản.

### T11 [P1]: sửa description, signals, example_vi
- description → `Dùng thuật ngữ pháp lý, kỹ thuật, tài chính hoặc nêu quy định mới (thông tư, xác thực sinh trắc, định danh mức 2, NFC, KYC, phong toả, mã hồ sơ, giấy triệu tập) để nạn nhân thấy mình kém hiểu và không dám hỏi lại; hay nhắm người lớn tuổi lúng túng với quy định xác thực mới.`
- signals (thay toàn bộ) → `["xác thực sinh trắc", "xac thuc sinh trac", "định danh mức 2", "KYC", "NFC", "theo thông tư mới", "mã hồ sơ", "phong toả", "giấy triệu tập", "quyết định số"]`
- example_vi → `Theo quy định mới, giao dịch trên 10 triệu phải xác thực sinh trắc học, bác chưa làm nên tài khoản bị hạn chế, cháu hướng dẫn bác làm qua Zalo nhé`
- Lý do: nguồn 3.4 Gemini (xác thực sinh trắc, NFC, dụ kết bạn Zalo chụp CCCD). Chỉ rõ `xác thực sinh trắc` theo yêu cầu.

### T12 [P2]: sửa description, signals, example_vi
- description → `Đưa ra số hiệu, tên cán bộ, mã nhân viên, biển tên, tên công ty chứng khoán hay ngân hàng thật, giấy phép, chứng chỉ, logo để tạo vẻ chính thống, và mời nạn nhân tự kiểm tra ở nơi do chính kẻ gian dựng.`
- signals (thay toàn bộ) → `["số hiệu", "mã cán bộ", "biển tên", "theo công văn", "đối tác của", "giấy phép kinh doanh", "chứng chỉ hành nghề", "công ty chứng khoán", "anh có thể kiểm tra", "mã nhân viên"]`
- example_vi → `Em là Thu Hà, chuyên viên tư vấn của một công ty chứng khoán lớn, đây là chứng chỉ hành nghề và giấy phép công ty, chị cứ kiểm tra thoải mái`
- Lý do: nguồn 6.1, 6.2 (mạo danh công ty chứng khoán, chứng chỉ).

---

## C. Cô lập nạn nhân (T13–T16)

### T13 [P1]: sửa description, signals, example_vi
- description → `Dặn không được kể với ai, kể cả vợ chồng, con cái và nhân viên ngân hàng; viện cớ án đang điều tra, bảo mật, giao dịch bí mật; có khi dặn sẵn lời khai dối khi bị hỏi (ví dụ ghi nội dung chuyển khoản là chuyển tiền đám cưới) hoặc không được tắt điện thoại. Biến giao dịch viên từ người có thể cứu nạn nhân thành người cần che giấu.`
- signals (thay toàn bộ) → `["đừng nói với ai", "giữ bí mật", "tuyệt đối không tiết lộ", "đừng nhắn cho chồng", "đừng cho ba mẹ biết", "nếu ngân hàng hỏi thì nói", "ghi nội dung chuyển khoản là", "không được tắt máy", "vụ án đang bảo mật", "đừng làm ầm"]`
- example_vi → `Vụ này đang trong giai đoạn bảo mật, nếu nhân viên ngân hàng hỏi thì chị cứ nói chuyển tiền mua đất, tuyệt đối không nhắc đến công an`
- Lý do: nguồn 2.3 Gemini (ép khai dối giao dịch viên), 2.1, 2.3 Claude (không được nói kể cả khi ngân hàng hỏi), 1.5 ("đừng nhắn tin cho chồng").

### T14 [P1]: sửa description, signals, example_vi
- description → `Ngăn nạn nhân gọi lại hoặc kiểm tra qua kênh khác: lý do giả (máy hư loa, đang họp, đang ở vùng sóng yếu), từ chối gọi video hoặc gặp trực tiếp, bắt xoá ứng dụng liên lạc chỉ giữ Zoom, bắt mua điện thoại hay mở tài khoản ngân hàng mới, không cho nói chuyện với người thân. Nếu có gọi video thì hình mờ, tiếng chập chờn (nghi deepfake) và được giải thích bằng sóng yếu.`
- signals (thay toàn bộ) → `["đừng gọi", "máy hư", "đang ở vùng sóng yếu", "sóng yếu", "đang không gọi được", "chỉ nhắn thôi", "xoá hết ứng dụng chỉ giữ Zoom", "mua điện thoại mới", "không nghe máy được", "đang họp"]`
- example_vi → `Anh đang ở chỗ sóng yếu nên gọi video bị giật, em cứ nhắn tin thôi, đừng gọi lại nha`
- Lý do: nguồn 1.3 Gemini (deepfake video vùng sóng yếu), 2.4 Gemini (xoá app chỉ giữ Zoom), 8.1 Claude ("em không thể gọi điện thoại bây giờ được").

### T15 [P2]: sửa description, signals, example_vi
- description → `Dụ chuyển từ SMS, cuộc gọi, Facebook sang Zalo, Telegram, Zoom, nhóm kín, room VIP, app lạ; tự thêm nạn nhân vào nhóm khi chưa đồng ý; tách từ nhóm lớn sang nhóm nhỏ vài người; ưu tiên Telegram vì xoá được tin nhắn.`
- signals (thay toàn bộ) → `["kết bạn Zalo", "ket ban zalo", "vào Telegram", "nhóm kín", "room VIP", "nhắn riêng", "add vào nhóm", "qua Zalo cho tiện", "link nhóm", "chat riêng"]`
- example_vi → `Chị kết bạn Zalo trợ lý của em để được kéo vào room VIP, bên trong có thầy đọc lệnh hướng dẫn miễn phí`
- Lý do: nguồn 5.1, 5.3 Gemini (nhóm 4 người), 6.1–6.3, 8.4 Gemini (Telegram).

### T16 [P2]: sửa description, signals, example_vi
- description → `Dựng tình huống khẩn cấp hoặc nhạy cảm để nạn nhân tin chỉ mình giải quyết được và không kịp hỏi ai; có khi kẻ gian dặn sẵn người nhà phải trả lời thế nào nếu bị hỏi (cứ xác nhận bố mẹ đang cần chuyển tiền).`
- signals (thay toàn bộ) → `["chỉ có em giúp được", "không ai khác biết", "đừng làm ầm", "đừng nói với mẹ", "tự lo liệu", "giải quyết êm", "lúc này chỉ tin em", "nếu ai hỏi thì cứ nói"]`
- example_vi → `Chuyện này mà lộ ra là cháu mất việc, chỉ dì giúp được thôi, dì cứ lặng lẽ chuyển rồi cháu giải thích sau`
- Lý do: nguồn 2.3 Claude (kịch bản trả lời sẵn cho con gái).

---

## D. Đánh vào cảm xúc (T17–T22)

### T17 [P1]: sửa description, signals, example_vi
- description → `Gây sợ hãi cho chính nạn nhân: bị bắt, tạm giam, ngồi tù, bị truy nã, lộ clip hoặc ảnh nhạy cảm, bị hại người nhà. Gồm kịch bản bắt cóc online: ép nạn nhân tự cô lập trong khách sạn, tự quay video hoặc ảnh (có khi nhạy cảm) rồi dùng chính ảnh đó và tài khoản của nạn nhân để đòi tiền chuộc từ gia đình.`
- signals (thay toàn bộ) → `["bị tạm giam", "ngồi tù", "bị truy nã", "hậu quả nghiêm trọng", "bị bắt", "phát tán ảnh", "clip nhạy cảm", "đòi tiền chuộc", "quay video xác minh", "không hợp tác thì"]`
- example_vi → `Nếu em không hợp tác trong hôm nay thì cơ quan sẽ ra lệnh bắt, hồ sơ sẽ gửi về trường và gia đình em`
- Lý do: nguồn 2.4 Gemini (bắt cóc online qua Zoom), 2.2 Claude (sinh viên bị ép quay video, đe doạ chặt ngón tay).

### T18 [P2]: sửa description, signals, example_vi
- description → `Báo người thân gặp nạn (tai nạn, cấp cứu, mổ, bị công an giữ) để nạn nhân hoảng và chuyển tiền ngay, thường nhờ chuyển cho một người thứ ba (bạn của chồng, bạn cùng phòng) lo viện phí; có thể dựng cả cuộc gọi video mờ để xác minh giả.`
- signals (thay toàn bộ) → `["cấp cứu", "tai nạn", "đang phẫu thuật", "viện phí", "tạm ứng bệnh viện", "bị công an giữ", "con chị bị", "bạn của chồng", "đang nằm viện"]`
- example_vi → `Em là bạn cùng phòng của Nam, Nam vừa bị xe tông đang cấp cứu, anh chị chuyển tạm ứng 20 triệu vào số này để bên em làm thủ tục mổ ngay`
- Lý do: nguồn 1.4 Gemini (chồng ở Hàn Quốc nhờ chuyển cho bạn lo phẫu thuật).

### T19 [P2]: sửa description, signals, example_vi
- description → `Khiến nạn nhân thấy có lỗi nếu nghi ngờ hoặc từ chối: nghi ngờ là vô ơn, không tôn trọng, không hợp tác; thường xen lời xoa dịu với lời doạ (cháu rất tôn trọng cô nhưng cô không tôn trọng lực lượng chức năng).`
- signals (thay toàn bộ) → `["bạn bè mà", "có vậy cũng hỏi", "không tin tao à", "không tôn trọng lực lượng chức năng", "chị không hợp tác", "em giúp chị mà", "ban be ma", "đừng bù lu bù loa"]`
- example_vi → `Em giúp chị làm hồ sơ cả tuần nay mà giờ chị còn nghi ngờ, vậy thôi em bỏ nhé, mất quyền lợi thì đừng trách em`
- Lý do: nguồn 2.2 Claude (đoạn đối thoại công an giả).

### T20 [P1]: sửa description, signals, example_vi
- description → `Hứa lợi ích bất thường: nhân đôi tài khoản, bao lời, bao lỗ, cam kết lãi vài chục phần trăm một tháng, rút được ngay; có khi hiện số dư lãi ảo lớn để nạn nhân tin tiền đã là của mình.`
- signals (thay toàn bộ) → `["x2 tài khoản", "nhân đôi tài khoản", "bao lời", "kiếm tiền dễ", "lãi 3-4%/ngày", "lãi khủng", "lợi nhuận 10% mỗi tháng", "rút ngay trong ngày", "làm ít được nhiều"]`
- example_vi → `Chị nạp 2 triệu, đêm nay hệ thống nhân đôi thành 4 triệu, sáng mai rút về luôn, bên em bao lời`
- Lý do: nguồn 6.1–6.3 Claude, 6.1 Gemini (36%/tháng), 8.3, 8.4 Gemini (số dư ảo).

### T21 [P1]: sửa description, signals, example_vi
- description → `Làm quen và xây quan hệ yêu đương qua mạng (tự nhận lính Mỹ, bác sĩ, Việt kiều, ca sĩ), gọi vợ yêu, chồng yêu rất sớm, hứa cưới, mua nhà, về Việt Nam; hay né gọi video; rồi báo gửi quà kèm phí hải quan hoặc dẫn sang đầu tư chung trên sàn tiền ảo. Dấu hiệu bổ sung: xưng hô nhầm giới, tài khoản mới lập, tin thân mật dồn dập, chuyển sang Telegram.`
- signals (thay toàn bộ) → `["vợ yêu", "chồng yêu", "anh yêu", "em yêu", "gửi quà cho em", "về Việt Nam cưới em", "mình về chung nhà", "vợ chồng mình", "em không thể gọi điện được", "my love", "honey"]`
- example_vi → `Vợ yêu ơi, anh báo đã gửi thùng quà có nhẫn kim cương cho em rồi, hải quan gọi thì em cứ làm theo họ để nhận nha, vài tháng nữa anh về cưới em`
- Lý do: nguồn 8.1 (hai báo), 8.2, 8.3 Claude, 8.2 Gemini. Thay example cũ vì cũ quá ngắn.

### T22 [P2]: sửa signals, example_vi
- signals (thay toàn bộ) → `["hoàn cảnh khó khăn", "không còn ai", "giúp em với", "hết tiền ăn", "con em đang sốt", "mới mất việc", "em xin anh", "em hứa trả"]`
- example_vi → `Anh ơi em mới mất việc, con em đang sốt mà em hết sạch tiền, anh giúp em vài trăm nghìn được không, em hứa trả anh sau`
- Lý do: tự nhiên hơn, tách khỏi T18 (không phải người thân gặp nạn do người lạ báo).

---

## E. Lời mời lợi ích (T23–T28)

### T23 [P1]: sửa description, signals, example_vi
- description → `Mời làm việc đơn giản tại nhà, thu nhập cao bất thường: tin rác hàng loạt (iMessage, Zalo, Facebook, Telegram) tự xưng trưởng phòng nhân sự, lương trả trong ngày, 15-30 triệu mỗi tháng, chỉ cần điện thoại và tài khoản ngân hàng; việc là thả tim, xem video, đánh giá phim, tăng truy cập website; có thể bị thêm vào nhóm khi chưa đồng ý.`
- signals (thay toàn bộ) → `["việc nhẹ lương cao", "viec nhe luong cao", "làm tại nhà", "cộng tác viên", "tuyển CTV", "lương trả trong ngày", "bán thời gian", "chỉ cần điện thoại", "10 phút nhận tiền", "trưởng phòng nhân sự", "không cần kinh nghiệm"]`
- example_vi → `Chào bạn, bên mình cần người làm bán thời gian, thả tim và đánh giá video khoảng 10 phút mỗi ngày, lương trả trong ngày, bạn nhắn Zalo để nhận hướng dẫn`
- Lý do: example cũ gần trùng dev-002; nguồn 5.1 Gemini, 5.1 Claude.

### T24 [P2]: sửa description, signals, example_vi
- description → `Báo trúng thưởng, nhận quà, tri ân khách hàng, quà hoặc kiện hàng từ nước ngoài (có khi bị hải quan giữ vì có tiền mặt) qua Messenger, SMS, Zalo, kèm mã số trúng thưởng và website lạ; sau đó mới đòi phí hồ sơ, thuế, vận chuyển.`
- signals (thay toàn bộ) → `["trúng thưởng", "trung thuong", "quà tri ân", "khách hàng may mắn", "mã số trúng thưởng", "vòng quay may mắn", "chúc mừng bạn đã", "nhận thưởng tại website", "kiện hàng bị hải quan giữ"]`
- example_vi → `Chúc mừng số điện thoại của bạn trúng một chiếc xe máy trong chương trình tri ân khách hàng quý này, truy cập website để đăng ký nhận thưởng`
- Lý do: nguồn 7.1–7.5 Claude, 7.1 Gemini.

### T25 [P1]: sửa description, signals, example_vi (gồm recovery scam)
- description → `Hứa hoàn tiền đơn hàng, hoàn phí bảo hiểm, hoàn thuế, bồi thường; HOẶC hứa giúp lấy lại số tiền đã bị lừa (giả công an, luật sư, trung tâm hỗ trợ thu hồi) nhưng đòi đóng phí xác minh hoặc phí thủ tục trước (recovery scam, nhắm nạn nhân vừa mất tiền). Cũng gồm xin số thẻ hoặc OTP để hoàn tiền.`
- signals (thay toàn bộ) → `["hoàn tiền", "hoàn phí", "hoàn thuế", "bồi thường", "lấy lại tiền đã mất", "hỗ trợ thu hồi tiền", "phí xác minh để hoàn trả", "sẽ được trả lại", "hoan tien"]`
- example_vi → `Bên em là đơn vị phối hợp với công an, hỗ trợ lấy lại 30 triệu chị bị lừa hôm trước, chị đóng trước 3 triệu phí xác minh là bên em làm hồ sơ ngay`
- Lý do: nguồn 7.4 Gemini (mở ngọc trai trúng thưởng rồi công an giả thu phí lấy lại tiền). Đây là khoảng trống của bản đồ hiện tại (xem mục Khoảng trống bên dưới).

### T26 [P1]: sửa description, signals, example_vi
- description → `Mời đầu tư lợi nhuận cam kết, không rủi ro: nhóm kín Zalo/Telegram có thầy hoặc chuyên gia đọc lệnh (phím hàng), trợ lý, hotgirl tỉa nến, app hoặc sàn riêng, cam kết bao lỗ hoặc bảo hiểm 100% vốn. Cho rút thử khoản nhỏ rồi chặn bằng phí quản lý lợi nhuận hoặc thuế; ép rời nhóm Zalo để rút.`
- signals (thay toàn bộ) → `["cam kết lãi", "bao lỗ", "bảo hiểm 100% vốn", "chuyên gia dẫn dắt", "đọc lệnh", "phím hàng", "room VIP", "sàn quốc tế", "USDT", "lợi nhuận 10% mỗi tháng", "không rủi ro"]`
- example_vi → `Thầy vừa phím mã mới trong room VIP, chị vào lệnh trước 2 giờ chiều, công ty cam kết bao lỗ 100%`
- Lý do: nguồn 6.1–6.3 hai báo cáo.

### T27 [P1]: sửa description, signals, example_vi
- description → `Giao nhiệm vụ (like, đánh giá phim, đặt đơn ảo) rồi bắt nạp tiền theo bậc VIP hoặc gói để nhận hoa hồng 20-45%. Vài vòng nhỏ trả tiền thật; tới mức lớn thì báo nạp sai lệnh, chưa hoàn thành chuỗi nhiệm vụ, quá 30 phút, phải hoàn thành nhiệm vụ mới rút được, đổ lỗi cho nạn nhân thao tác sai rồi ép nạp thêm hoặc đi vay.`
- signals (thay toàn bộ) → `["làm nhiệm vụ", "hoa hồng", "nạp để mở khoá nhiệm vụ", "nạp sai lệnh", "hoàn thành nhiệm vụ mới rút được", "chưa hoàn thành chuỗi nhiệm vụ", "nâng cấp VIP", "gói nạp", "đơn ảo", "nhiem vu"]`
- example_vi → `Bạn đã nạp sai lệnh nên hệ thống treo 18 triệu, muốn rút cả gốc lẫn hoa hồng thì phải nạp thêm 18 triệu để hoàn thành chuỗi nhiệm vụ`
- Lý do: các cụm nạp sai lệnh, hoàn thành nhiệm vụ mới rút được lấy từ nguồn 5.2, 5.3 Claude, 5.3, 5.4 Gemini. Kể cả tin hợp lệ (tuyển dụng thật) rất ít dùng các cụm này.

### T28 [P2]: sửa description, signals, example_vi
- description → `Mời vay nhanh, không thế chấp, duyệt trong vài phút, rồi đòi nộp trước phí bảo hiểm khoản vay, phí giải ngân, hoặc viện cớ nhập sai thông tin tài khoản để bắt chuyển tiền sửa lệnh; xin ảnh CCCD.`
- signals (thay toàn bộ) → `["vay nhanh", "không thế chấp", "giải ngân trong ngày", "chỉ cần CCCD", "duyệt trong 5 phút", "phí bảo hiểm khoản vay", "chứng minh khả năng trả nợ", "nhập sai số tài khoản", "lãi suất 0%"]`
- example_vi → `Hồ sơ vay 80 triệu của anh đã duyệt, nhưng anh nhập sai số tài khoản nên cần chuyển 4 triệu phí để hệ thống mở lại lệnh giải ngân`

---

## F. Kỹ thuật thao túng và vận hành (T29–T40)

### T29 [P2]: sửa description, signals, example_vi
- description → `Cho trước một lợi nhỏ thật (hoa hồng đơn đầu, tiền cước 200-500k, 150k chuyển thật, quà tặng) để nạn nhân thấy có nghĩa vụ đáp lại và tin tưởng, rồi đòi khoản lớn hơn nhiều.`
- signals (thay toàn bộ) → `["bên em đã chuyển trước", "đã trả hoa hồng cho chị", "tặng chị tiền cước", "em tặng trước", "giờ tới lượt chị", "chị cũng nên giúp lại", "quà tặng miễn phí"]`
- example_vi → `Em đã chuyển 150k vào tài khoản chị để chị thấy bên em uy tín rồi, giờ chị nạp 5 triệu lên gói cao hơn nha`
- Lý do: nguồn 6.2 hai báo cáo (150k, tặng tiền cước).

### T30 [P1]: sửa description, signals, example_vi
- description → `Xin hành động nhỏ trước rồi dẫn dần tới yêu cầu lớn: dò số dư (tài khoản còn tiền không), đang làm gì vậy, nhờ chút việc, bấm xác nhận, chụp màn hình, đọc 4 số cuối thẻ rồi tới OTP, thả tim, bấm link thử.`
- signals (thay toàn bộ) → `["chỉ cần xác nhận", "bấm thử", "tài khoản còn tiền không", "còn dư không", "đang làm gì vậy", "nhờ chút việc", "đọc 4 số cuối", "làm thử bước đầu", "chụp màn hình gửi lại"]`
- example_vi → `Chị đang rảnh không, em nhờ chút việc nhỏ thôi, chị đọc giúp em 4 số cuối thẻ để em kiểm tra hạn mức, chưa mất gì đâu`
- Lý do: nguồn 4.1 (Đang làm gì vậy, nhờ chút việc), 1.2 (còn dư không), 3.5 (4 số cuối rồi OTP).

### T31 [P2]: sửa description, signals, example_vi
- description → `Dùng chim mồi và tài khoản ảo khoe bill, khoe lãi, nhóm hàng trăm người khoe thắng lệnh, nhắn riêng bảo người nhà đang làm công ty này; ảnh chuyển khoản và ảnh nhận lương là giả.`
- signals (thay toàn bộ) → `["nhiều người đã nhận", "ảnh chuyển khoản", "khoe bill", "vừa rút được", "cả nhóm đều làm", "chị mình cũng làm công ty này", "tớ đã nhận lại tiền", "hàng trăm thành viên"]`
- example_vi → `Mình làm bên này được 2 tháng rồi, tuần trước vừa rút 12 triệu, ảnh bill nè, bạn cứ làm theo anh trợ lý là ổn`
- Lý do: nguồn 5.3 (chim mồi), 6.1 (80/100 người là chim mồi).

### T32 [P1]: sửa description, signals, example_vi
- description → `Yêu cầu chuyển vào tài khoản khác: số mới, tài khoản bạn anh, cô kế toán, QR cửa hàng vàng, hoặc tài khoản mang tên người khác (có khi trùng tên người bị mạo danh để vượt bước kiểm tra tên). Kèm lý do giả: tài khoản cũ đang lỗi, bị phong toả, đang kiểm toán. Dấu hiệu mạnh: tên chủ tài khoản không khớp người đang nhắn.`
- signals (thay toàn bộ) → `["chuyển vào số này", "chuyển qua số này", "chuyen vao so nay", "số mới", "tài khoản bạn anh", "tài khoản cô kế toán", "đổi tài khoản nhận", "tài khoản cũ đang bị phong toả", "QR cửa hàng", "tài khoản đang lỗi"]`
- example_vi → `Tài khoản cũ bên anh đang bị phong toả tạm thời, em chuyển đợt này sang số của kế toán chi nhánh giúp anh nhé`
- Lý do: nguồn 1.1, 4.1, 4.3 Claude; 4.3 Gemini (đổi tài khoản nhận phút chót).

### T33 [P1]: sửa description, signals, example_vi
- description → `Bắt chuyển tiền sang tài khoản an toàn, tài khoản giám sát hoặc tạm giữ (tự xưng của viện kiểm sát, cơ quan điều tra) để chứng minh tiền sạch hoặc tài sản hợp pháp, hứa sẽ trả lại sau khi điều tra; có khi ép rút tiết kiệm, mở tài khoản ngân hàng mới theo chỉ dẫn.`
- signals (thay toàn bộ) → `["tài khoản an toàn", "tài khoản tạm giữ", "tài khoản giám sát", "chứng minh tiền sạch", "chứng minh tài sản hợp pháp", "phục vụ công tác điều tra", "sẽ được trả lại sau điều tra", "rút tiết kiệm", "mở tài khoản mới"]`
- example_vi → `Anh chuyển toàn bộ tiền tiết kiệm sang tài khoản giám sát của viện kiểm sát để chứng minh nguồn gốc hợp pháp, điều tra xong sẽ hoàn trả đủ`
- Lý do: nguồn 2.1, 2.3, 2.4 Claude; 2.3 Gemini.

### T34 [P1]: sửa description, signals, example_vi
- description → `Hỏi mã OTP, mật khẩu, PIN, CVV, 4 số cuối thẻ, hoặc ảnh CCCD hai mặt, ảnh hay video khuôn mặt, giọng nói để xác thực sinh trắc; qua cuộc gọi, form web giả hoặc bắt đọc mã vừa gửi về máy.`
- signals (thay toàn bộ) → `["mã OTP", "ma otp", "mã xác nhận", "đọc giúp mã", "mật khẩu", "số CVV", "4 số cuối", "chụp CCCD hai mặt", "quay video khuôn mặt", "xác thực khuôn mặt"]`
- example_vi → `Em thấy hệ thống vừa gửi mã 6 số về máy anh, anh đọc lại cho em để hoàn tất nâng hạn mức nhé`
- Lý do: nguồn 3.5 Claude, 3.4 Gemini (chụp CCCD, gọi video thu khuôn mặt, giọng nói).

### T35 [P1]: sửa description, signals, example_vi
- description → `Bắt cài ứng dụng lạ (file .apk, app dịch vụ công giả, AnyDesk, TeamViewer điều khiển từ xa), mở link, quét QR, hoặc bấm link bình chọn, nhận quà để chiếm tài khoản Zalo/Facebook; link thường có tên thương hiệu nhưng tên miền lạ (.top, .xyz, .vip).`
- signals (thay toàn bộ) → `["cài app", "tải ứng dụng", "file .apk", "bấm link", "quét mã QR", "bình chọn giúp", "AnyDesk", "TeamViewer", "điều khiển từ xa", "cập nhật ứng dụng", ".top"]`
- example_vi → `Em bình chọn giúp con gái chị cuộc thi này nha, bấm vào link rồi đăng nhập Zalo để xác nhận phiếu`
- Lý do: nguồn 4.2 Claude (hack Zalo sau link bình chọn cho con gái), 3.3 Gemini (.apk SpyNote), 3.1 Gemini (.top).

### T36 [P2]: sửa description, signals, example_vi
- description → `Gửi ảnh hoặc file lệnh bắt, quyết định khởi tố, hợp đồng đầu tư, giấy phép kinh doanh, biên lai, bill chuyển khoản, ảnh hoặc video kiện hàng giả để tạo niềm tin. Một tờ giấy hợp lệ trong cuộc trò chuyện bình thường (hợp đồng thuê nhà, biên lai tiền điện) không tính nếu không đi kèm yêu cầu chuyển tiền hay hành động gấp.`
- signals (thay toàn bộ) → `["lệnh bắt", "lệnh tạm giam", "quyết định khởi tố", "giấy triệu tập", "hợp đồng đầu tư qua Zalo", "giấy phép kinh doanh", "ảnh kiện hàng", "bill chuyển khoản", "có đóng dấu"]`
- example_vi → `Đây là quyết định tạm giữ tài khoản có chữ ký và con dấu của Bộ Công an, chị xem file đính kèm rồi làm theo hướng dẫn`
- Lý do: bỏ `biên lai`, `hợp đồng` trần (dễ nhầm tin hợp lệ).

### T37 [P2]: sửa description, signals, example_vi
- description → `Nhắc chi tiết cá nhân thật (họ tên, CCCD, số BHXH, địa chỉ, số dư nợ, ngày mở thẻ) hoặc nhận là người quen (bạn học cũ, anh nhớ em không) để tạo ảo giác đã tra hệ thống và đáng tin; số liệu lẻ chính xác là mánh hay dùng.`
- signals (thay toàn bộ) → `["anh nhớ em không", "bạn học cũ", "hôm trước mình có gặp", "biết cả tên địa chỉ", "số CCCD của anh là", "mã hồ sơ", "ngày mở thẻ", "dư nợ quá hạn", "nhận ra em chưa"]`
- example_vi → `Anh Lê Văn An, CCCD đuôi 4417, đúng không? Thẻ mở ngày 12/3 của anh đang nợ quá hạn 38.274.600 đồng, anh nghe tôi nói tiếp nhé`
- Lý do: nguồn 2.1 Gemini (số lẻ, ngày mở thẻ), 2.4 Gemini (đọc đúng số căn cước, BHXH).

### T38 [P2]: sửa description, signals, example_vi
- description → `Chủ động nói không phải lừa đảo, uy tín, không mất phí, có giấy phép, cứ kiểm tra, có vấn đề tôi chịu trách nhiệm để vô hiệu hoá nghi ngờ trước khi nó xuất hiện. Câu yên tâm đơn lẻ trong tin hợp lệ (ví dụ chị yên tâm, em gửi đủ rồi) không tính nếu không đi kèm yêu cầu tiền hoặc thông tin nhạy cảm.`
- signals (thay toàn bộ) → `["không phải lừa đảo", "khong phai lua dao", "uy tín 100%", "không mất phí", "có giấy phép đàng hoàng", "cứ kiểm tra", "có vấn đề tôi chịu trách nhiệm", "chắc chắn an toàn", "đừng nghe người ngoài"]`
- example_vi → `Mọi người hay hiểu lầm nhóm mình là lừa đảo thôi, bên mình có giấy phép đàng hoàng, tham gia không mất phí, có gì anh chịu trách nhiệm`
- Lý do: nguồn 5.1 Claude (không mất bất kỳ khoản phí nào), 5.3 (chị ấy chịu trách nhiệm). Bỏ `yên tâm` trần khỏi signals.

### T39 [P2]: sửa description, signals, example_vi
- description → `Đọc lệnh từng bước (qua điện thoại hoặc nhắn tin), đòi báo khi xong từng bước, không cho cúp máy hay đặt máy, để nạn nhân không kịp dừng và nghĩ lại; thường đi từ mở app, chọn chuyển tiền, rồi đọc màn hình hoặc mã.`
- signals (thay toàn bộ) → `["làm theo em", "xong bước này chưa", "báo em khi xong", "đang ở bước nào", "đừng cúp máy", "đừng tắt máy", "giờ chị mở app", "bấm tiếp mục", "đọc em nghe màn hình"]`
- example_vi → `Chị đừng cúp máy nhé, giờ mở app ngân hàng, bấm mục chuyển tiền, rồi đọc em nghe màn hình đang hiện gì`
- Lý do: nguồn 2.1 Claude ("không được tắt điện thoại"), 6.2 Gemini (đọc lệnh làm theo).

### T40 [P1]: sửa description, signals, example_vi
- description → `Bắt đóng phí, thuế hoặc khoản trá hình để được nhận tiền hoặc rút tiền: phí mở khoá, phí hải quan, phí vận chuyển, phí bảo hiểm, phí chứng nhận, phí xác minh, thuế thu nhập, phí quản lý lợi nhuận, phí gas, phí kích hoạt mã nhận thưởng, hoặc một phần trăm số dư ảo (khoảng 5%); có khi bắt mua thẻ cào. Dù nạn nhân đóng đủ vẫn có khoản mới.`
- signals (thay toàn bộ) → `["phí mở khoá", "phí thủ tục", "phí hải quan", "phí vận chuyển", "thuế thu nhập cá nhân", "phí quản lý lợi nhuận", "phí kích hoạt", "phí gas", "đóng thuế để rút", "mua thẻ cào", "tài khoản đang bị treo"]`
- example_vi → `Số dư 19 tỷ của anh đã sẵn sàng rút, nhưng hệ thống yêu cầu đóng trước 5% thuế thu nhập mới giải phóng lệnh rút`
- Lý do: nguồn 8.4 Claude (5% cho rút, lãi ảo 19 tỷ), 6.3, 7.3, 7.6, 8.3 Gemini.

---

## 1. Tổng kết số lượng

- Tổng thủ thuật đề xuất sửa: **40/40**. Chia theo mức: **P1 = 24** (T01, T02, T03, T05, T06, T07, T08, T10, T11, T13, T14, T17, T20, T21, T23, T25, T26, T27, T30, T32, T33, T34, T35, T40), **P2 = 16** (T04, T09, T12, T15, T16, T18, T19, T22, T24, T28, T29, T31, T36, T37, T38, T39).
- Phải đổi vì gần trùng test hiện có: T23 (dev-002), T06 (motif dev-001).
- Đã tách rõ cặp chồng lấn: T03/T17 (bỏ `bị bắt` khỏi T03).
- Signals trần dễ gây false positive đã bỏ/rào lại: `ngay`, `liền` (T01), `yên tâm` (T38), `biên lai`, `hợp đồng` (T36).

## 2. Khoảng trống: thủ thuật có trong nguồn nhưng bản đồ CHƯA bắt tốt

Vì không được thêm id mới, mỗi khoảng trống dưới đây được **gắn vào một id sẵn có** (đã đưa vào description ở trên). Cột "nên bắt bởi" cho biết id nào phải đạt khi chấm tin tương ứng.

| # | Thủ thuật thật trong nguồn | Nguồn | Nên bắt bởi | Mức bắt hiện tại | Đã xử lý ở |
|---|---|---|---|---|---|
| G1 | Deepfake video/giọng: gọi video thấy mặt bạn thân nhưng mờ, chập chờn, viện cớ vùng sóng yếu | 1.3 Gemini | T14 + T06 | Yếu: T14 chỉ có "máy hư", "đừng gọi", không có từ chối video | T14 description + signals `vùng sóng yếu` |
| G2 | Ép nói dối giao dịch viên ngân hàng (ghi nội dung chuyển khoản là chuyển tiền đám cưới), hạn chế nói chuyện ở quầy | 2.3 Gemini; 2.1, 2.3 Claude | T13 (+ T16) | Yếu: T13 chỉ có "đừng nói với ai", không nhắc ngân hàng | T13 description + signals `ghi nội dung chuyển khoản là` |
| G3 | Bắt cóc online qua Zoom: xoá app liên lạc chỉ giữ Zoom, mua điện thoại mới, tự quay video (kể cả nhạy cảm), dùng ảnh/tài khoản đó đòi tiền chuộc người nhà | 2.4 Gemini; 2.2 Claude | T17 + T14 + T07 | Yếu: không thủ thuật nào mô tả quy trình này | T17, T14, T07 description |
| G4 | Recovery scam: giả công an/luật sư hứa lấy lại tiền đã mất, đòi phí xác minh | 7.4 Gemini | T25 (+ T07) | Yếu: T25 chỉ hoàn tiền đơn hàng | T25 description + signals |
| G5 | Hack tài khoản bằng link bình chọn rồi dùng danh bạ lan tiếp (vector chiếm Zalo) | 1.3, 4.2 Claude; 1.1 Gemini | T35 + T06/T10 | Trung bình: T35 chưa nói bình chọn | T35 signals `bình chọn giúp` |
| G6 | Dò số dư rồi mới nói số tiền (còn dư không, đang làm gì vậy, nhờ chút việc) | 1.2, 4.1 Claude | T30 | Yếu | T30 description + signals |
| G7 | Tên người nhận trùng với người bị mạo danh, hoặc không khớp người nhắn | 4.1, 1.1 Claude | T32 | Trung bình: có "tài khoản bạn", thiếu "tên không khớp/trùng" | T32 description |
| G8 | Đổ lỗi ngược: bạn thao tác sai, nạp sai lệnh nên mất tiền, muốn lấy lại phải nạp thêm | 5.3 Claude; 5.3 Gemini | T27 (+ T19) | Yếu: T27 chưa có "nạp sai lệnh" | T27 signals + description |
| G9 | Xin sinh trắc: ảnh CCCD hai mặt, video khuôn mặt, giọng nói để xác thực | 3.4 Gemini; 2.4 Claude | T34 (+ T11) | Yếu: T34 chỉ OTP, mật khẩu, CVV | T34 description + signals |
| G10 | SMS brandname chèn chung luồng SMS thật; link tên miền lạ (.top) mang tên ngân hàng | 3.1, 3.4 Gemini; 3.1 Claude | T08 + T35 | Yếu: không có mô tả về kênh và tên miền | T08, T35 description |
| G11 | Khai dối với người thân/ngân hàng theo kịch bản đã dặn (dặn con gái cứ xác nhận bố mẹ cần chuyển tiền) | 2.3 Claude | T16 + T13 | Yếu | T16 description |
| G12 | Tống tiền bằng ảnh nhạy cảm sau khi dụ gửi ảnh riêng tư (tình cảm, sinh viên) | 8.4 Gemini | T17 + T21 | Yếu | T17 description |
| G13 | Tin mở đầu không có yêu cầu tiền (xã giao Đang làm gì vậy, chào bạn, nhóm chào mừng) | 4.1, 5.1 Claude | T30, T15, T23 | Rủi ro: LLM dễ cho 0 điểm vì chưa có ép tiền | Cần xử lý ở prompt/score, không ở tactics_map (xem mục 3) |
| G14 | Nhóm chat có nhiều "sếp" giả cùng phối hợp (đồng thuận nhóm giả lập) | 4.1, 4.2 Gemini | T10 + T31 | Yếu | T10 description |
| G15 | Chim mồi nhắn riêng thay trợ lý, bảo người nhà đang làm công ty đó | 5.3 Claude | T31 | Trung bình | T31 description + signals |

Hai khoảng trống **không gắn được vào id hiện có một cách sạch**, nên ghi nhận để Khánh cân nhắc (không thể thêm id nên chỉ dùng như ghi chú cho prompt/few-shot):
1. **Nhập vai hai tầng "người tốt – người xấu"** (người yêu hào phóng + nhân viên hải quan) từ 8.2 Gemini: có thể xếp vào T21 + T40 nhưng cặp vai này rất đặc trưng; nên có 1 few-shot dạng hội thoại để LLM thấy cả hai vai trong cùng chuỗi.
2. **Hiệu ứng số dư ảo (Endowment)** từ 8.3 Gemini (web giả hiện số dư rất lớn): đã đưa vào T20 và T40 (số dư ảo, % lãi ảo), nhưng chưa có thủ thuật riêng.

## 3. Ghi chú thêm cho prompt A9 (ngoài phạm vi bản đồ, chỉ để tham khảo)

- Một số nguồn chỉ có tin **mở đầu** vô hại (G13). Nếu A9 chấm từng tin, nên cho phép tin xã giao kèm tín hiệu như kênh lạ, người lạ, đòi chuyển sang kênh khác ở mức rủi ro thấp-trung bình thay vì 0, và dùng `stage` (tiếp cận, tạo tin, đòi tiền, leo thang) nếu schema cho phép (Claude Recommendations mục 2).
- Nhiều thủ thuật chính (T07, T27, T40) diễn ra qua cuộc gọi. Nếu tập test chỉ có text, cần few-shot mô tả lời kể lại cuộc gọi (nhãn `call-retold`), vì tin nhắn chỉ chứa lệnh bắt giả, số tài khoản.
- Tập tin hợp lệ khó (SMS ngân hàng thật, vay tiền thật giữa người thân, thông báo tuyển dụng thật) vẫn nên thêm vào `test_messages.json` để kiểm các signal trần như `chuyển`, `hợp đồng`, `nhiệm vụ`.
- Trước khi dùng công khai, che các số tài khoản và tên người thật có trong nguồn; các example mới đều dùng tên và số tự đặt.

## 4. Quy trình áp dụng gợi ý

1. Duyệt P1 trước (24 mục), copy các khối `description`, `signals`, `example_vi` vào `tactics_map.json` (chỉ thay 3 trường này, không đụng id, name, group).
2. Rà JSON hợp lệ (không có dấu nháy kép bên trong chuỗi).
3. `py ai/scripts/build_prompt.py` rồi `py ai/scripts/check_contract.py`.
4. Chạy lại tập dev, xem T01, T36, T38 có làm tăng false positive trên dev-003 không; nếu có thì rút thêm signals trần.
5. Áp dụng P2.
