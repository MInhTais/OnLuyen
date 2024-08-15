import { RegisterOptions, FieldValues, UseFormGetValues } from 'react-hook-form';
import * as yup from 'yup';

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions };
export const getRules = (getValues?: UseFormGetValues<FieldValues>): Rules => ({
  email: {
    required: 'Email là bắt buộc',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng',
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 kí tự',
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 kí tự',
    },
  },
  
  password: {
    required: 'Password là bắt buộc',
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 kí tự',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 kí tự',
    },
  },
  confirm_password: {
    required: 'Nhập password là bắt buộc',
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 kí tự',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 kí tự',
    },
    validate:
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'Mật khẩu không khớp' : undefined,
  },
});

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 - 160 kí tự'),
  password: yup
    .string()
    .required('Password là bắt buộc ')
    .min(6, 'Độ dài từ 6 - 150 kí tự')
    .max(160, 'Độ dài từ 6 - 150 kí tự'),
  confirm_password: handleConfirmPasswordYup('password'),

  name: yup
    .string()
    .required('Nhập vào họ và tên')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 - 160 kí tự'),
  phone: yup.
  string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa các chữ số")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(15, "Số điện thoại không được vượt quá 15 chữ số")
    .required("Số điện thoại là bắt buộc"),
  city: yup
    .string()
    .required('Vui lòng chọn Tỉnh/Thành phố'),
  district: yup
    .string()
    .required('Vui lòng chọn Quận/Huyện'),
  ward: yup
    .string()
    .required('Vui lòng chọn Phường/Xã'),
  address: yup
    .string()
    .required('Vui lòng nhập địa chỉ'),
  default: yup
    .boolean()
    
})

export type Schema = yup.InferType<typeof schema>