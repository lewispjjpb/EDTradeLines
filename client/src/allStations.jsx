import * as React from 'react'
// import {render} from 'react-dom'
import Downshift from 'downshift'


function AllStations(props) {
  // console.log(props.statList)
  // if (props.statList) {
  //   console.log ('hasn\t populated')
  // } else {
  //   console.log(props)
  // }
  let items = props.statList;

  return  (
    <Downshift
    onChange={selection =>
      selection ? props.getStation(selection) : 'Type station name...'
    }
    // itemToString={item => (item ? item.value : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div id="searchbox">
          <label {...getLabelProps()}>Select a station:  </label>
          <div
            {...getRootProps({}, {suppressRefError: true})}
          >
            <input {...getInputProps()} />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter(item => !inputValue || item.includes(inputValue))
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                          // width: '300px',
                         },
                      })}
                    >
                      {item}
                    </div>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

export default AllStations
