import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PromoInputForm from 'widgets/forms/PromoInputForm'
import { getPromoDetail } from 'redux/action/promo'

const PromoCreate = () => {
    const promoDetail = useSelector((state) => state.promo.detail)
    return (
        <PromoInputForm
            data={promoDetail}
        ></PromoInputForm>
    )
}

export default PromoCreate;