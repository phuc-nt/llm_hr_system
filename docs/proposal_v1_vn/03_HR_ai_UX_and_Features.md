# **HR.ai: UX STRATEGY & ADVANCED FEATURES**

Tài liệu này mở rộng concept HR.ai, tập trung vào giải quyết các bài toán thực tế về UX, Kỹ thuật và Quản trị dữ liệu khi đưa vào vận hành.

## **1. UX/UI: Từ "Chatbot" đến "Data Assistant"**

Chúng ta không muốn user phải "chat" vu vơ. UX cần hướng dẫn họ ra lệnh chính xác.

### **1.1. Giao diện "Smart Command Bar" (Thanh lệnh thông minh)**

Thay vì một ô chat box nhỏ ở góc (kiểu support), hãy biến nó thành trung tâm (giống Google Search hoặc Spotlight trên MacOS).

* **Vị trí:** Nằm ngay trên đầu Dashboard hoặc nhấn phím tắt Ctrl + K để gọi ra.
* **Autosuggest (Gợi ý thông minh):**
  * Khi user gõ "Doanh thu...", hệ thống gợi ý ngay: *"Doanh thu theo tháng", "Doanh thu so sánh cùng kỳ".*
  * Dựa trên lịch sử: *"Lặp lại báo cáo tuần trước?"*
* **Input đa dạng:** Hỗ trợ nhập liệu bằng giọng nói (Voice-to-Text) cho các Leader hay di chuyển, dùng Mobile App.

### **1.2. Chế độ "Exploration Mode" (Chế độ Khám phá)**

Sau khi AI trả về kết quả (VD: Biểu đồ cột), user có thể tương tác tiếp trên biểu đồ đó:

* **Drill-down:** Click vào cột "Tháng 10" -> AI tự hiểu và query chi tiết *"Danh sách nhân viên tháng 10"*.
* **Pivot/Switch:** Nút bấm nhanh để chuyển đổi view: "Xem theo Phòng ban" <-> "Xem theo Dự án".

### **1.3. Cơ chế "Human-in-the-loop" (Xác thực)**

* Trước khi hiển thị kết quả cuối cùng, AI hiển thị một dòng diễn giải logic (Natural Language Explanation):
  * *AI:* "Tôi đang tìm kiếm các nhân viên có **nguồn dữ liệu là API**, trạng thái **Đã duyệt**, trong **tháng 11/2024**. Có đúng ý bạn không?"
  * *User:* "Đúng rồi" hoặc "Không, tính cả chưa duyệt đi".

## **2. Kỹ thuật: Xử lý các ca khó (Edge Cases)**

### **2.1. Vấn đề "Dữ liệu chưa đồng bộ" (Data Consistency)**

* **Tình huống:** API từ phòng ban khác đẩy về trễ, hoặc file CSV import bị lỗi format ngày tháng.
* **Giải pháp AI:**
  * Khi user hỏi số liệu tháng này, nếu phát hiện dữ liệu nguồn API chưa có record nào trong 3 ngày gần nhất -> AI cảnh báo: *"Lưu ý: Dữ liệu từ API có vẻ chưa được cập nhật mới nhất (lần cuối 3 ngày trước). Kết quả có thể chưa đủ."*

### **2.2. Vấn đề "Câu hỏi mơ hồ" (Ambiguity)**

* **Tình huống:** User hỏi "Ai làm việc tốt nhất?" (Khái niệm "tốt nhất" rất mơ hồ).
* **Giải pháp AI:** Không được tự đoán. Phải hỏi ngược lại (Clarification):
  * *"Bạn muốn đánh giá 'tốt nhất' dựa trên tiêu chí nào? (A) Số giờ làm nhiều nhất, hay (B) Không đi muộn/về sớm?"*

### **2.3. Vấn đề "Bảo mật dòng dữ liệu" (Row-Level Security - RLS)**

* **Thách thức:** Trưởng phòng A không được xem lương/công của phòng B.
* **Giải pháp:**
  * Prompt System luôn được inject thêm biến môi trường CURRENT_USER_DEPT_ID.
  * Câu SQL sinh ra luôn tự động chèn thêm WHERE department_id = 'USER_DEPT_ID'.
  * Lớp Middleware chặn các query cố tình truy cập bảng nhạy cảm (như bảng users_passwords hoặc salary_config).

## **3. Mở rộng tính năng: "Proactive AI" (AI Chủ động)**

Không chờ user hỏi, AI tự động phục vụ:

### **3.1. Smart Alerts (Cảnh báo thông minh)**

* Thay vì user phải vào soi từng dòng công, AI chạy background job hàng đêm.
* **Use case:**
  * *"Phát hiện 5 nhân viên có số giờ làm việc > 12 tiếng/ngày liên tục trong 3 ngày qua. Nguy cơ burnout (kiệt sức)."* -> Gửi noti cho HR.
  * *"Phát hiện dữ liệu import CSV hôm nay có 20 dòng trùng lặp với dữ liệu nhập tay."* -> Gửi noti cho Admin.

### **3.2. Automated Timesheet Approval (Duyệt công tự động)**

* AI phân tích pattern chấm công.
* Những dòng công "bình thường" (đúng giờ, đúng vị trí, khớp lịch sử) -> AI đề xuất **Auto-Approve**.
* Những dòng công "bất thường" (sai giờ, IP lạ, số giờ quá cao) -> AI flag lại **"Cần review"** cho Leader.
  * *Lợi ích:* Giảm 90% thời gian ngồi duyệt công thủ công của Leader.

## **4. Checklist triển khai (Next Steps)**

1. **Data Cleaning:**
   * Rà soát lại 3 nguồn dữ liệu (Manual, CSV, API). Đảm bảo chuẩn hóa format Date, Employee ID trước khi cho AI học.
2. **Define Metrics:**
   * Thống nhất định nghĩa các chỉ số: "Công chuẩn", "OT", "Đi trễ", "Nghỉ phép". Viết vào Metadata.
3. **Prototype UI:**
   * Vẽ wireframe cho màn hình Dashboard mới với thanh Search Bar làm trung tâm.

---
**Quay lại:** [System Design](./02_HR_ai_System_Design.md)