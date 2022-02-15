import React from 'react'
import Downshift from 'downshift'


function AllStations(props: any) {
  let items:any = props.statList;
  let promptText: string;
  props.statList.length > 0
  ?  promptText = "Type station name..."
  : promptText = "Station list still loading..."

  return  (
    <Downshift
    onChange={selection =>
      selection ? props.getStation(selection) : ''
    }
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
            <input {...getInputProps()} placeholder={promptText}/>
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter(item => !inputValue || item.toUpperCase().includes(inputValue.toUpperCase()))
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
