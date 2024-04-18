
import { Field } from 'formik';
import FormField from './Field';
const DepartmentSelect = () => {
    return (
        <FormField>
            <Field name="department" id="department" component="select">
                <option value="">Chọn khoa</option>
                <option value="Neural">Thần kinh</option>
                <option value="Cardiology">Tim mạch</option>
                <option value="Orthopedic">Chấn thương chỉnh hình</option>
                <option value="Oncology">Ung thư</option>
                <option value="Gynecology">Phụ khoa</option>
                <option value="Pediatric">Nhi</option>
                <option value="Psychiatry">Tâm thần</option>
                <option value="Dermatology">Da liễu</option>
                <option value="Ophthalmology">Mắt</option>
                <option value="ENT">Tai mũi họng</option>
                <option value="Dental">Nha khoa</option>
            </Field>
        </FormField>
    )
}

export default DepartmentSelect;