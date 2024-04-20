import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Field, useFormikContext } from 'formik';
import FormField from './Field';

const LocationSelect = ({}) => {
  const { setFieldValue } = useFormikContext();
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
      setData(result.data);
      setCities(result.data);
    };
    fetchData();
  }, []);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    const city = data.find(city => city.Id === cityId);
    setDistricts(city ? city.Districts : []);
    setWards([]);
    setFieldValue('address.city', cityId); // Changed from 'address.province'
    setFieldValue('address.district', '');
    setFieldValue('address.ward', '');
  };

const handleDistrictChange = (event) => {
  const districtId = event.target.value;
  const district = districts.find(district => district.Id === districtId);
  setWards(district ? district.Wards : []);
  setFieldValue('address.district', districtId);
  setFieldValue('address.ward', '');
};

const handleWardChange = (event) => {
  const wardId = event.target.value;
  setFieldValue('address.ward', wardId);
};
  return (
    <FormField>
      <Field as="select" name="address.city" onChange={handleCityChange}>
        <option value="">Chọn tỉnh thành</option>
        {cities.map(city => (
          <option key={city.Id} value={city.Id}>{city.Name}</option>
        ))}
      </Field>

      <Field as="select" name="address.district" onChange={handleDistrictChange}>
        <option value="">Chọn quận huyện</option>
        {districts.map(district => (
          <option key={district.Id} value={district.Id}>{district.Name}</option>
        ))}
      </Field>

      <Field as="select" name="address.ward" onChange={handleWardChange}>
        <option value="">Chọn phường xã</option>
        {wards.map(ward => (
          <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
        ))}
      </Field>
    </FormField>
  );
};

export default LocationSelect;