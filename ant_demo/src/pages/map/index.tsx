import React, { useState,useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import NewFacilityForm from "@/components/NewFacilityForm"
import FacilityDetailDrawer from "@/components/FacilityDetailDrawer"
import { Button } from 'antd';
import {getAllFacility} from "@/services/ant-design-pro/api"


const APIKEY = "AIzaSyDzbER3z58Yod9AMiD0h1rGQHSYsLUmr10"






const MapMarker = (props) => {
  const [clicked, setclicked] = useState(props.facility.isClaimed);
  let Element;

  let myOnFinish = () => {
    console.log("custom on finish triggered")
    
    setclicked(true)

  }

  


  
  if (clicked == false ) {
    Element = <NewFacilityForm  Facility={props.facility} onFinish={myOnFinish}/>
  }
  else{
    Element = <FacilityDetailDrawer Facility={props.facility}/>
  }

  return(
    <div>
      {Element}
    </div>
  )
  

}



const map = (props: any) => {
    const [center, setCenter] = useState({lat: 42.29553272103043, lng: -83.70988601483924 });
    const [zoom, setZoom] = useState(15);
    const [facilities, setFacilities] = useState<API.NewFacility[]>([]);
    //let facilities : API.NewFacility[];

    useEffect( () => {
      async function fetchFacilities() {
        const newFacilities : API.NewFacility[] =  await getAllFacility()
        setFacilities(newFacilities)
        console.log(newFacilities)
      }
      fetchFacilities()
    },[]);


    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIKEY }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {facilities.map((facility,index) => (
            //  console.log(parseFloat(facility.latitude)),
              <MapMarker
                key={index}
                facility={facility}
                lat={parseFloat(facility.latitude)}
                lng={parseFloat(facility.longitude)}
              />
            ))}
        </GoogleMapReact>
      </div>
    );
}

export default map;