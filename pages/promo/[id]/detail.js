import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PromoInputForm from 'widgets/forms/PromoInputForm'
import { getPromoDetail } from 'redux/action/promo'
import { useRouter } from 'next/router';

const PromoDetail = () => {
    const {isReady,query} = useRouter();
    const dispatch = useDispatch();
    const promoDetail = useSelector((state) => state.promo.detail)

    useEffect(() => {
        if(isReady){
            dispatch(getPromoDetail(query.id))
        }
    }, [isReady])
    return (
        <PromoInputForm
            id={promoDetail.id}
            data={promoDetail}
        ></PromoInputForm>
    )
}

export default PromoDetail;