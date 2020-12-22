import * as React from 'react';
import { useEffect,  useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import {listFacts} from './API';
import AddFactForm from './AddFactForm';

const App = () => {
  const [factList, setFactList] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addFactLocation, setAddFactLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  const getFactList = async () => {
    const factList= await listFacts();
    setFactList(factList);
  };

  useEffect(() => {
    getFactList();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude]  = event.lngLat
    setAddFactLocation({
      latitude,
      longitude,
    });
    setShowPopup({
      showPopup, 'new':true
    });
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={"mapbox://styles/seemadixit/ckikqosa2170517np3e86jmyy"}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >

      {
          factList.map(entry =>(
            <React.Fragment key={entry._id}>
              <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-12}
              offsetTop={-24}>
              <div onClick={() => setShowPopup({showPopup, [entry._id]: true})  }>
                <img src="https://i.imgur.com/y0G5YTX.png" alt="marker" className="marker" />
              </div>
              </Marker>
              {
                showPopup[entry._id] ? (
                <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                dynamicPosition = {true}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.name}</h3>
                    <p>{entry.facts}</p>
                  </div>
                </Popup>
              ) : null
            }
            {
              addFactLocation && showPopup['new'] ? (
                <>
                <Marker
                latitude={addFactLocation.latitude}
                longitude={addFactLocation.longitude}
                offsetLeft={-12}
                offsetTop={-24}>
                <div>
                  <img src="https://i.imgur.com/y0G5YTX.png" alt="marker" className="marker" />
                </div>
                </Marker>
                <Popup
                latitude={addFactLocation.latitude}
                longitude={addFactLocation.longitude}
                dynamicPosition = {true}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                      <AddFactForm
                      location={addFactLocation}
                      onClose = {() => {
                          setAddFactLocation(null);
                          getFactList();
                      }}
                      />
                  </div>
                </Popup>
                </>
              ): null
            }
            </React.Fragment>
          ))
      }
    </ReactMapGL>
  );
}

export default App;
