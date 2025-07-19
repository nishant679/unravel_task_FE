import React, { useState } from 'react';


const ShowVariants = ({ variants, name }) => {
  const INITIAL_COUNT = 2;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleToggle = () => {
    setVisibleCount(visibleCount === variants.length ? INITIAL_COUNT : variants.length);
  };

  const isExpanded = visibleCount === variants.length;

  return (
    <div className="space-y-6">
      {variants.slice(0, visibleCount).map((variant) => (
        <div
          key={variant.variant_id}
          style={{border:'1px solid #d3d3d3', padding:'10px', marginTop:'10px', fontSize:'1.1rem', color:'grey'}}
        >
            <label style={{fontSize:'1.4rem', fontWeight:'900', color:'green', marginBottom:'10px', padding:'10px 0'}}>{name}</label>
          <div className="">
            <div className="text-xl font-semibold"> {variant.name}</div>
            
            <div>
                
                {variant.display_properties.map((prop) => (
                <li key={prop.name} className="flex items-center gap-2">
                    <div className="font-medium">{prop.display_name}:</div>
                    <div>{prop.value}</div>
                </li>
                ))}
            </div>

            <div style={{marginTop:'12px', fontSize:'0.9rem'}}>
                <div>Price for 1 night</div>
                <div>Includes Taxes & fees</div>
                <div style={{marginBottom:'12px', color:'black', fontWeight:'900', padding:'5px 0', fontSize:'1.2rem'}}>
                {variant.total_price.currency} {variant.total_price.discounted_price_rounded} 
                </div>
                
            </div>
          </div>

          {variant.cancellation_info?.free_cancellation && (
            <div style={{marginTop:'10px'}}>
              <span style={{color:'green', fontWeight:'300', }}> Cancelation Policy: </span>  {variant.cancellation_info.free_cancellation_info}
            </div>
          )}

          {variant.promo_list?.[0]?.offer_title && (
            <div style={{marginTop:'10px'}} >
              {variant.promo_list[0].offer_title} – {variant.promo_list[0].offer_description}
            </div>
          )}
        </div>
      ))}

      {variants.length > INITIAL_COUNT && (
        <div className="text-center">
          <button
            style={{border:'1px solid green', padding:'10px 62px', fontSize:'1rem', fontWeight:'900', margin:'10px 0', color:'#fff', backgroundColor:'green'}}
            onClick={handleToggle}
          >
            {isExpanded ? 'Show Less Option' : 'Show More Option'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowVariants;
