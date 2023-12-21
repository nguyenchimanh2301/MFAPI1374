<template>
  <div class="dark--screen" :class="{'close-form': closeCss}">
    <div class="form">
      <div class="form--content">
        <div class="form--title">
          <h3>Thông tin khách hàng</h3>
          <div class="icon--close-popup"  @click="closeForm"></div>
        </div>
        <div class="form--input">
          <div class="form__input--left">
            <div style="display: flex; justify-content: space-between">
              <label id="label" for=""
                ><span>Mã khách hàng<span class="text--required">*</span></span>
                <!-- <input
                  :class="{
                    'border-error': v$.customerSelect.CustomerCode.$error,
                  }"
                  type="text"
                  id="empcode"
                  v-model="state.customerSelect.CustomerCode"
                  ref="dummykeyboard"
                /> -->
                 <MInput
                 v-model="state.customerSelect.CustomerCode"
                  input-id="empcode"
                 :hasError="v$.customerSelect.CustomerCode.$error"
                 ref="focusText"
                 ></MInput>
                <span
                  style="font-size: 12px; color: red"
                  v-if="v$.customerSelect.CustomerCode.$error"
                >
                  {{ v$.customerSelect.CustomerCode.$errors[0].$message }}
                </span>
              </label>
              <!-- <MInput label="Mã khách hàng"
                :class="{'border-error':v$.customerSelect.CustomerCode.$error}"
                  type="text"
                  id="empcode"
                  v-model="state.customerSelect.CustomerCode"
                  >
                  <span style="font-size: 12px;color: red;" v-if="v$.customerSelect.CustomerCode.$error">
                 {{ v$.customerSelect.CustomerCode.$errors[0].$message }}
                 </span>
                </MInput> -->
           
              <label id="label"
                ><span>Họ và tên<span class="text--required">*</span></span>
                <MInput
                 v-model="state.customerSelect.FullName"
                 :hasError="v$.customerSelect.FullName.$error"
                 input-id="name"
                 ></MInput>
                <span
                  style="font-size: 12px; color: red"
                  v-if="v$.customerSelect.FullName.$error"
                >
                  {{ v$.customerSelect.FullName.$errors[0].$message }}
                </span>
              </label>
            </div>
            <label id="label" for=""
              >Số điện thoại
              <MInput
                 v-model="state.customerSelect.PhoneNumber"
                 :hasError="v$.customerSelect.PhoneNumber.$error"
                 input-id="phoneNumber"
                 ></MInput>
              <span
                style="font-size: 12px; color: red"
                v-if="v$.customerSelect.PhoneNumber.$error">
                {{ v$.customerSelect.PhoneNumber.$errors[0].$message }}
              </span>
            </label>
            <label id="label" for=""
              >Email
              <MInput
                 v-model="state.customerSelect.Email"
                 :hasError="v$.customerSelect.Email.$error"
                 input-id="email"
                 ></MInput>
              <span
                style="font-size: 12px; color: red"
                v-if="v$.customerSelect.Email.$error">
                {{ v$.customerSelect.Email.$errors[0].$message }}
              </span>
            </label>
          </div>
          <div class="form__input--right">
            <div>
              <label id="label" for=""
                >Ngày sinh
                <input type="date" id="selectedDate" />
              </label>
              <label id="label" for=""
                >Giới tính
                <div class="box__input--radio">
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.customerSelect.Gender"
                      value="0"
                    />Nam</label
                  >
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.customerSelect.Gender"
                      value="1"
                    />Nữ</label
                  >
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.customerSelect.Gender"
                      value="2"
                    />Khác</label
                  >
                </div>
              </label>
            </div>
            <div
              style="
                display: flex;
                width: 550px;
                justify-content: space-between;
              "
            >
              <label id="label" for=""
                >Số CMTND
                <div class="tooltip">Số chứng minh thư nhân dân</div>
                <MInput
                 v-model="state.customerSelect.CustomerGroupId"
                 input-id="idCard"
                 ></MInput>
              </label>
              <label id="label" for=""
                >Ngày cấp
                <input type="date" id="DateRange" />
              </label>
            </div>
            <label id="label" for=""
              >Nơi cấp
              <input type="text" style="width: 546px" />
            </label>
          </div>
        </div>
        <div class="form__input--under">
          <label id="label" for=""
            >Số tiền nợ
            <p>Giá trị nhập vào: {{ formattedValue }}</p>
            <input
              type="text"
              style="width: 260px"
              id="DebitAmount"
              v-model="state.customerSelect.DebitAmount"
            />
            <span
              style="font-size: 12px; color: red"
              v-if="v$.customerSelect.DebitAmount.$error"
            >
              {{ v$.customerSelect.DebitAmount.$errors[0].$message }}
            </span>
          </label>
          <label id="label" for=""
            >Công ty
            <input
              type="text"
              id="company"
              v-model="state.customerSelect.CompanyName"
            />
          </label>
          <label id="label" for=""
            >Địa chỉ
            <input
              type="text"
              id="address"
              v-model="state.customerSelect.Address"
            />
          </label>
        </div>
        <div class="form--footer">
          <button class="button btn--cancel" @click="closeForm">Hủy</button>
          <button class="button btn-main" @click="showDlg">Cất</button>
        </div>
      </div>
    </div>
    <the-dialog
      v-if="isShowDlg"
      @addData="addData"
      @hideDlg="hideDlg"
      :type="type"
      :title="title"
    >
    </the-dialog>
  </div>
  <MToast :text="content" :errorMsg="msgError" :icon="typeToast" v-if="showToast"> 
  </MToast>
</template>


<script>
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  maxLength,
  numeric,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed,  } from "vue";
import MISAResource from "../js/helper/resource";
import MInput from "./Pages/MInput.vue";

export default {
    props: ["customerSelected", "methodP"],
    created() {
        this.state.customerSelect = this.customerSelected;
        this.method = this.methodP;
        this.methodP === this.MISAEnum.method.ADD
            ? (this.title = "THÊM MỚI")
            : (this.title = "THAY ĐỔI");
       console.log(this.$refs.focusText);

    },
    setup() {
        //reactive validate
        const state = reactive({
            customerSelect: {
                CustomerCode: "",
                Email: "",
                FullName: "",
                PhoneNumber: "",
                DebitAmount: "",
                Gender: 1
            },
        });
        //validate
        const rules = computed(() => {
            return {
                customerSelect: {
                    CustomerCode: {
                        required: helpers.withMessage(MISAResource["VN"].CustomerNotEmpty, required),
                        // minLength: minLength(6),
                    },
                    Email: {
                        // required: helpers.withMessage(MISAResource["VN"].EmailNotEmpty, required),
                        email: helpers.withMessage(MISAResource["VN"].EmailNotValid, email),
                    },
                    FullName: {
                        required: helpers.withMessage(MISAResource["VN"].FullNameNotEmpty, required),
                        // minLength: minLength(10),
                    },
                    PhoneNumber: {
                        required: helpers.withMessage(MISAResource["VN"].PhoneIsNotEmpty, required),
                        numeric: helpers.withMessage(MISAResource["VN"].PhoneIsNumeric, numeric),
                        minLength: helpers.withMessage(MISAResource["VN"].PhoneIsValid, minLength(10)),
                        maxLength: helpers.withMessage(MISAResource["VN"].PhoneIsValid, maxLength(10)),
                    },
                    DebitAmount: {
                        numeric: helpers.withMessage(MISAResource["VN"].DebitAmountIsNumeric, numeric),
                        // minLength: minLength(4),
                    },
                },
            };
        });
        const v$ = useValidate(rules, state);
        return { state, v$ };
    },
    methods: {
        showDlg() {
            this.type =
                this.methodP === this.MISAEnum.method.ADD
                    ? this.MISAResource.notice.information
                    : this.MISAResource.notice.question;
            this.isShowDlg = true;
        },
        hideDlg() {
            this.isShowDlg = false;
        },
        //hàm thêm,thay đổi dữ liệu
        //cretedBy : NC Mạnh
        //CreatedAt : 5/12/2023
        addData() {
            this.v$.$validate();
            if (this.v$.$error) {
                // alert("error");
                document.getElementById("empcode").focus();
                // console.log(this.v$.$errors[0].$message);
                this.isShowDlg = false;
                // this.closeForm();
                return;
            }
            else {
               this.customer = Object.assign({}, this.state.customerSelect);
                this.typeToast = this.MISAResource.notice.information;
                if (this.method === this.MISAEnum.method.ADD) {
                    try {
                        this.api
                            .post(this.MISAapi, this.customer)
                            .then((response) => {
                            response.data;
                            this.errorCode(response);
                            this.loadForm();
                            this.closeForm();
                        })
                            .catch((error) => {
                          //  this.content = this.errorCode(e.response.data.errors.CustomerCode[0]);
                          console.log(error);
                            this.errorCode(error.response);
                            this.typeToast = this.MISAResource.notice.warning;
                            this.loadForm();
                           

                        });
                        // this.loadForm();
                    }
                    catch (error) {
                      this.errorCode(error);
                      this.loadForm();
                    }
                }
                else {
                  this.typeToast = this.MISAResource.notice.information;
                    try {
                        this.api
                            .put(this.MISAapi+'/'+
                            this.state.customerSelect.CustomerId, this.customer)
                            .then((response) => {
                            response.data;
                            this.msgError.push(this.MISAEnum);
                            this.errorCode(response);
                            this.loadForm();
                            this.closeForm();
                        }).catch((e) => {
                            console.log(e.response.data)
                             this.errorCode(e.response);
                            this.typeToast = this.MISAResource.notice.warning;
                            this.loadForm();
                            // alert(this.msgError);
                        });
                    }
                    catch (error) {
                        console.log(error);
                        console.log();
                    }
                }
            }
        },
        //hàm bắt lỗi trả về từ api
        //CreatedBy: NCManh
        //CreatedDate:15/12/2023
        errorCode(error) {
           console.log(error.status)
           this.msgError = [];
            switch (error.status) {
                case 200:
                    return this.msgError.push(this.MISAResource.returnMessage.updateComplete);
                // case 201:
                //       return this.msgError.push(this.MISAResource.returnMessage.addComplete);
                case 204:
                      return this.msgError.push(this.MISAResource.returnMessage.NotFoundEntity);
                case 400:
                    return this.msgError = error.data.errors.CustomerCode;
                case 404:
                     return this.msgError.push(this.MISAResource.returnMessage.notFoundUrl)
                case 500:
                     return  this.msgError.push(this.MISAResource.returnMessage.severError)
                default:
                    return " ";
            }
        },
        //hàm loadForm
        //cretedBy : NC Mạnh
        //CreatedAt : 5/12/2023
        loadForm() {
            // window.location.reload();
            this.$emit("loadData");
            this.isShowDlg = false;
            // this.closeForm();
            this.showToast=true
            setTimeout(() => 
            this.showToast=false,2000
            )
        },
        //hàm đóng form
        //cretedBy : NC Mạnh
        //CreatedAt : 5/12/2023
        closeForm() {
            this.closeCss = true;
            setTimeout(() => 
            this.$emit("some-event"),2000
            )
        },
    },
   
    mounted() {
      document.getElementById("empcode").focus();
    },
    data() {
        return {
            customerSelect: {},
            isShowDlg: false,
            showToast: false,
            method: 0,
            title: " ",
            content: " ",
            formattedValue: 0,
            type: "",
            customer: {},
            msgError: [],
            typeToast :"",
            closeCss : false,
            
        };
    },
    components: { MInput }
};
</script>

<style>
.close-form{
  /* animation:  hide 4s ; */
  position: absolute;
  top: -100%;
}

@keyframes hide{
    0% {
      transform: Rotate(120deg);
    }
    25% {
        transform: Rotate(240deg);
    }
    25% {
        transform: Rotate(360deg);
    }
    50% {
        transform: translateY(-110%);
    }
}

.border-error {
  border: 1px solid red !important;
}
</style>