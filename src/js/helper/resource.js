const MISAResource = {
  VN: {
      "CustomerNotEmpty" : 'Mã khách hàng  không được để trống',
      "FullNameNotEmpty" : 'Họ tên không được để trống',
      "EmailNotEmpty" : 'Email không được để trống',
      "EmailNotValid" : 'Email không đúng định dạng',
      "PhoneIsNumeric" : 'Điện thoại phải là số',
      "PhoneIsNotEmpty" : 'Điện thoại không được để trống',
      "PhoneIsValid" : 'Điện thoại phải đủ 10 số',
      "DebitAmountIsNumeric" : 'Tiền nợ  phải là số',
  },
  EN: {
    "CustomerNotEmpty" : 'Mã nhân viên không được để trống',
    "FullNameNotEmpty" : 'Họ tên không được để trống',
    "EmailNotValid" : 'Email không đúng định dạng',
  },
  returnMessage: {
    addComplete: "THÊM MỚI THÀNH CÔNG",
    updateComplete: "THAY ĐỔI THÀNH CÔNG",
    deleteComplete: "XÓA KHÁCH HÀNG THÀNH CÔNG",
    notFoundUrl: "Đường dẫn không chính xác",
    severError: "Lỗi hệ thống",
    NotFoundEntity : "Không tìm thấy thông tin"

  },
  notice: {
    question: "question",
    information: "info",
    error: "error",
    warning: "warning",

  },
 
  //hàm format tiền
//CreadtedBy : NC Mạnh
//CreatedDate "5/12/2023"
  formatCurrency (amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  },


   //hàm format ngày tháng
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    formatDate(dateString) {
        let date = new Date(dateString);
        // Lấy ngày, tháng và năm từ đối tượng Date
        let day = date.getDate(); // Ngày
        let month = date.getMonth() + 1; // Tháng (0-11, cần cộng thêm 1)
        let year = date.getFullYear(); // Năm
        // Định dạng lại theo dd/mm/yyyy
        return (this.formattedDate = `${day < 10 ? "0" + day : day}/${
          month < 10 ? "0" + month : month
        }/${year}`);
      },
  //hàm Định dạng tiền
  //cretedBy : NC Mạnh
  //CreatedAt : 5/12/2023
//   formatCurrency () {
//     // Xóa ký tự không phải số và chấp nhận số và dấu chấm
//     let value = this.state.customerSelect.DebitAmount;
//     // Format giá trị số theo định dạng tiền tệ VND
//     value = parseFloat(value).toLocaleString("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     });
  
//     // Cập nhật giá trị đã định dạng vào biến formattedValue để hiển thị
//     this.state.customerSelect.DebitAmount = value;
//   },
};



export default MISAResource;
