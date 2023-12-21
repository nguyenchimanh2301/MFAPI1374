<template>
  <div class="container">
    <div class="content">
      <div class="feature__button">
        <div class="title">
          <div style="position: relative">
            <h2 style="font-size: 25px">Quản lý khách hàng</h2>
          </div>
        </div>
        <div class="btn--feature">
          <button id="btn-add" class="button btn-main" @click="showForm">
            Thêm mới
            <div class="icon--adduser"></div>
          </button>
        </div>
      </div>
      <div class="table">
        <div class="main--content">
          <div style="background-color: #ffffff">
            <div class="feature">
              <div class="feature__box">
                <div class="box__input--icon">
                  <div class="item--select">
                    <div>
                      <div>
                        Đã chọn<span id="count">{{ sum }}</span>
                      </div>
                      <div><span id="clear">Bỏ chọn</span></div>
                      <div class="icon--close"></div>
                    </div>
                    <button class="button btn--delete">
                      Xóa tất cả<i class="icon--trash"></i>
                    </button>
                  </div>
                </div>
                <div class="box__select--icon">
                  <div style="position: relative"></div>
                  <export-excel 
                    :data  = "customers">
                   <button>
                    <div class="icon--filter" ></div>
                  </button>
                 </export-excel>
                  <button>
                    <div class="icon--reload"></div>
                  </button>
                </div>
              </div>
            </div>
            <!-- start table data -->
            <div class="scroll-table">
              <table id="table">
              <thead>
                <tr>
                  <th style="width: 50px">
                    <input
                      id="check"
                      type="checkbox"
                      v-model="selectAll"
                      @change="toggleSelectAll"
                    />
                  </th>
                  <th>Mã khách hàng</th>
                  <th>Họ và tên</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Công ty</th>
                  <th>Dư nợ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style="position: relative"
                  v-for="(item, index) in orderedUsers"
                  :key="index"
                  @mouseover="showTooltip(index)"
                  @mouseleave="hideTooltip"
                  :class="{ 'highlighted-row': index === selectedRowIndex }"
                  @keydown.down.prevent="moveDown(index)"
                  @keydown.up.prevent="moveUp(index)"
                  @keydown.enter.prevent="
                    showData(orderedUsers[selectedRowIndex])
                  "
                  @click="Select(index)"
                  tabindex="0"
                >
                  <td>
                    <input
                      id="check"
                      type="checkbox"
                      :value="item"
                      v-model="selectedItems"
                      @change="CountRowSelect"
                    />
                  </td>
                  <td class="txt-left">{{ item.CustomerCode }}</td>
                  <td class="txt-left">{{ item.FullName }}</td>
                  <td class="txt-left">
                    {{ this.MISAEnum.GenderName(item.Gender) }}
                  </td>
                  <td class="txt-center">{{ this.MISAResource.formatDate(item.DateOfBirth) }}</td>
                  <td class="txt-left">{{ item.CompanyName }}</td>
                  <td class="txt-right">
                    {{ this.MISAResource.formatCurrency(item.DebitAmount) }}
                  </td>
                  <div class="tooltips" v-show="tool === index">
                    <button @click="showDlg(item)">
                      <div class="icon--delete"></div>
                    </button>
                    <button @click="showData(item)">
                      <div class="icon--edit"></div>
                    </button>
                  </div>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <div class="footer">
          <div style="font-weight: 600">Tổng: 100</div>
          <div class="paging">
            <span>Số bản ghi/trang</span>
            <span
              >
              <select name="" id="" v-model="pageSize" @change="changPageSize">
                <option  value="10">10</option>
                <option  value="13">13</option>
                <option value="20">20</option>
              </select></span
            >
            <div>
              <div id="previous" @click="previous(this.numberPage)"></div>
              <div id="next" @click="next(this.numberPage)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TheFormInfo
    v-if="isShowForm"
    @some-event="hideForm"
    :customerSelected="customer"
    :methodP="method"
    @showFormToast="showFormToast"
    @loadData="load"
  >
  </TheFormInfo>
  <!-- this is toast-message -->
  <MToast :text="content"  v-if="showToast" :errorMsg="msgError" :icon="type"> </MToast>
  <MLoader v-if="loader"></MLoader>
  <!-- end toast-message -->
  <!-- this is dialog -->
  <the-dialog
    v-if="isShowDlg"
    @removeData="deleteData"
    @hideDlg="hideDlg"
    :title="title"
    :type = "type"
    :customerIdRemove="customerID"
  >
  </the-dialog>
  <!-- end dialog -->
</template>

<script>
import TheFormInfo from "../TheFormInfo.vue";

import _ from "lodash";
export default {
  computed: {
    orderedUsers: function () {
      return _.orderBy(this.customers, "FullName", "Asc");
    },
  },
  created() {
    try {
      this.loader = true;
      this.api
        .get(`https://localhost:7096/api/v1/Customers/getpaging?pageSize=10&numberSize=1`)
        // .get(`https://cukcuk.manhnv.net/api/v1/Customers`)
        .then((response) => {
          console.log(response.data);

          this.customers = response.data;
          this.loader = false;
        })
        .catch((e) => {
          console.log(e);

          // this.errors.push(e);
        });
    } catch (error) {
      console.log(error);
    
    }

  },
  
  //   watch: {
  //   // Theo dõi sự thay đổi trong mảng selectedItems
  //      selectedItems: {
  //        handler(newVal) {
  //       // Kiểm tra xem tất cả các mục đã được chọn chưa
  //       this.selectAll = newVal.every(item => item);
  //       console.log(this.selectAll);
  //     },
  //     deep: true
  //   }

  // },
  methods: {
    changPageSize(){
    this.LoadDataPagination(this.numberPage,this.pageSize);
    },
    CountRowSelect()   {
      this.sum = this.selectedItems.length; // Cập nhật tổng số phần tử trong selectedItems
    },
 
    toggleSelectAll() {
      // Đảo ngược giá trị của selectAll và cập nhật mảng selectedItems tương ứng
      // this.selectedItems = this.selectedItems.map(() => this.selectAll);
      if (this.selectAll) {
        this.selectedItems = [...this.orderedUsers]; // Select all items
      } else {
        this.selectedItems = []; // Deselect all items
      }
      this.sum = this.selectedItems.length;
    },
    Select(index){
      this.selectedRowIndex = index;
      this.showTooltip(index);
      this.row = index;
       const selected = this.orderedUsers[index];
       const isSelected = this.selectedItems.includes(selected);
    if (!isSelected) {
      this.selectedItems.push(selected); // Thêm vào mảng nếu chưa được chọn
    } else {
      this.selectedItems = this.selectedItems.filter(item => item !== selected); // Loại bỏ nếu đã được chọn
    }
     this.CountRowSelect();
    },

    moveUp(index) {
      if (this.row >0) {
        index = --this.row;
        this.selectedRowIndex = index;
        this.showTooltip(index);

      }
    },
    moveDown(index) {
      if (this.row < this.orderedUsers.length-1) {
      index = ++this.row;
      this.selectedRowIndex = index;
      this.showTooltip(index);
      }
    },
     
    showFormToast() {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
    //hàm ẩn Dialog
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    hideDlg() {
      this.isShowDlg = false;
    },
    //hàm show Dialog
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showDlg(item) {
      this.isShowDlg = true;
      this.title = "Xóa";
      this.customerID = item;
      console.log(item);
      this.type = this.MISAResource.notice.warning;

    },
    //hàm xóa customer
    //param : CustomerId
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    deleteData(id) {
      // this.content = this.MISAResource.returnMessage.deleteComplete;
      this.msgError.push(this.MISAResource.returnMessage.deleteComplete);
      try {
        this.api
          .delete(this.MISAapi+'/'+id)
          .then((response) => {
            response.data;
            this.isShowDlg = false;
            this.load();
            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
            }, 2000);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    //hàm show tool
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showTooltip(index) {
      this.tool = index;
    },

    hideTooltip() {
      this.tool = [];
    },
    //hàm lấy về từng khách hàng
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showData(item) {
      this.isShowForm = true;
      this.customer = item;
      this.method = this.MISAEnum.method.UPDATE;
      this.content = this.MISAResource.returnMessage.updateComplete;
      this.type = this.MISAResource.notice.question;

    },
    //hàm mở form thông tin
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showForm() {
      this.isShowForm = true;
      this.customer = {};
      this.method = this.MISAEnum.method.ADD;
      this.content = this.MISAResource.returnMessage.addComplete;
      console.log(this.type);
    },
    //hàm đóng form thông tin
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    hideForm() {
      this.isShowForm = false;
    },
    
    //hàm về trang trước  
    //CreadtedBy : NC Mạnh
    //CreatedDate "19/12/2023"
    previous(numberPage,pageSize){
       pageSize = this.pageSize;
       this.numberPage= --numberPage;
       this.LoadDataPagination(this.numberPage,pageSize);
    },
     //hàm về trang kế tiếp  
    //CreadtedBy : NC Mạnh
    //CreatedDate "19/12/2023"
    next(numberPage,pageSize){
       pageSize = this.pageSize;
       this.numberPage= ++numberPage;
       this.LoadDataPagination(this.numberPage,pageSize);
    },
     //hàm lấy thông tin phân trang
    //CreadtedBy : NC Mạnh
    //CreatedDate "19/12/2023"
    LoadDataPagination(numberPage,pageSize){
      pageSize = this.pageSize
     try { 
      this.api
        .get(this.MISAapi+`/getpaging?pageSize=`+pageSize+`&numberSize=`+numberPage+``)
        .then((response) => {
          this.customers = response.data;
          // console.log(this.customers);
          this.loader = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      } catch (error) {
      console.log(error);
    }
    },
    //hàm load dữ liệu
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    load() {
      try {
        this.api
          .get(`https://localhost:7096/api/v1/Customers/getpaging?pageSize=10&numberSize=1`)
          .then((response) => {
            this.customers = response.data;
            // console.log(this.customers);
          })
          .catch((e) => {
            this.errors.push(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      customers: [],
      isShowForm: false,
      customer: {},
      showToast: false,
      tool: [],
      content: "",
      method: 0,
      formattedDate: "",
      selectedRowIndex: 0,
      row: 0,
      selectAll: false,
      selectedItems: [],
      sum: 0,
      loader: false,
      title: "",
      customerID: {},
      isShowDlg: false,
      ckeckedBox: true,
      type :"question",
      msgError :[],
      numberPage : 1,
      pageSize : 10
    };
    // Thêm các dòng dữ liệu khác cần hiển thị
  },
  components: {
    TheFormInfo,
  },
};
</script>


<style>
.tooltips {
  position: absolute;
  z-index: 10;
  right: 15%;
  display: flex;
  align-items: center;
  justify-items: center;
  height: 40px;
  width: 80px;
  justify-content: space-between;
  /* background-color: red; */
}
.tooltips button {
  height: 30px;
  width: 30px;
  border: none;
  outline: none;
  background-color: #f2fff0;
}

.highlighted-row {
  background-color: #f2fff0; /* Màu nền để làm nổi bật dòng đang được chọn */
}
.focus-row {
  backdrop-filter: red;
}
</style>