import React, {useEffect, useRef, useState} from 'react'
import './search.scss'
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

const apiKey = process.env.REACT_APP_GOOGLE_LOC_API_KEY;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

let sessionToken = '';
// load google map api js

function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    })
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  })
}

// const extractAddress = (place) => {

//   const address = {
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     plain() {
//       const city = this.city ? this.city + ", " : "";
//       const zip = this.zip ? this.zip + ", " : "";
//       const state = this.state ? this.state + ", " : "";
//       return city + zip + state + this.country;
//     }
//   }

//   if (!Array.isArray(place?.address_components)) {
//     return address;
//   }

//   place.address_components.forEach(component => {
//     const types = component.types;
//     const value = component.long_name;

//     if (types.includes("locality")) {
//       address.city = value;
//     }

//     if (types.includes("administrative_area_level_2")) {
//       address.state = value;
//     }

//     if (types.includes("postal_code")) {
//       address.zip = value;
//     }

//     if (types.includes("country")) {
//       address.country = value;
//     }

//   });

//   return address;
// }


function Search() {

//   const searchInput = useRef(null);
//   const [address, setAddress] = useState({});


//   // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if(window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly&language=en&token=${sessionToken}&sessionToken=${sessionToken}&sessiontoken=${sessionToken}`;
    return loadAsyncScript(src);
  }

//   // do something on address change
//   const onChangeAddress = (autocomplete) => {
//     const place = autocomplete.getPlace();
//     setAddress(extractAddress(place));
//   }

//   // init autocomplete
//   const initAutocomplete = () => {
//     if (!searchInput.current) return;

//     const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
//     autocomplete.setFields(["address_component", "geometry"]);
//     autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

//   }


//   const reverseGeocode = ({ latitude: lat, longitude: lng}) => {
//     const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
//     searchInput.current.value = "Getting your location...";
//     fetch(url)
//         .then(response => response.json())
//         .then(location => {
//           const place = location.results[0];
//           const _address = extractAddress(place);
//           setAddress(_address);
//           searchInput.current.value = _address.plain();
//         })
//   }


//   const findMyLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         reverseGeocode(position.coords)
//       })
//     }
//   }





  // load map script after mounted
    useEffect(() => {
        initMapScript().then(()=>{
            setMapScriptLoaded(true);
            console.log("google",window.google);
            sessionToken = new window.google.maps.places.AutocompleteSessionToken();
            console.log(sessionToken);
        })
    }, []);

    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({lat:null, lng:null});
    const [mapScriptLoaded, setMapScriptLoaded] = useState(false);

    const handleSelect = async(value) => {
        sessionToken = new window.google.maps.places.AutocompleteSessionToken();
        setAddress(value);
        const result = await geocodeByAddress(value);
        const latLng = await getLatLng(result[0]);
        console.log(result[0]);
        setCoordinates(latLng);
    }

  return (
      <div>
          {mapScriptLoaded && 
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} shouldFetchSuggestions={address.length > 2} searchOptions={{sessionToken:true},{withSessionToken:true},{componentRestrictions: { country: ['IN'] }}}>
            {
                ({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
                    <div>
                        <input {...getInputProps({placeholder: "Type here"})}/>

                        <div>
                            {loading?<div>...loading</div>:null}

                            {suggestions.map(suggestion =>{
                                const style = {
                                    backgroundColor: suggestion.active? "#41b6e6" : "#fff"
                                }
                                return <div {...getSuggestionItemProps(suggestion, {style})}>
                                    {suggestion.description}
                                </div>
                            })}
                        </div>
                    </div>
                )
            }
            </PlacesAutocomplete>
          }
      </div>
    // <div className="App">
    //   <div>
    //     <div className="search">
    //       <span>S</span>
    //       <input ref={searchInput} type="text" placeholder="Search location...."/>
    //       <button onClick={findMyLocation}>L</button>
    //     </div>

    //     <div className="address">
    //       <p>City: <span>{address.city}</span></p>
    //       <p>State: <span>{address.state}</span></p>
    //       <p>Zip: <span>{address.zip}</span></p>
    //       <p>Country: <span>{address.country}</span></p>
    //     </div>

    //   </div>
    // </div>
  )
}

export default Search