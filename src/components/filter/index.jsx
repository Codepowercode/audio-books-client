import './style.filter.css'
import Select, { components } from 'react-select'
import dropIcon from '../../assets/images/icons/select-icon.svg'

const Filter = () => {
  const statusItems = audioBook
    .map((item) => {
      const { status } = item
      return status
    })
    .map((element, i) => {
      return {
        value: i,
        label: element,
      }
    })

  const authorItems = audioBook
    .map((item) => {
      const { authorName } = item
      return authorName
    })
    .map((element, i) => {
      return {
        value: i,
        label: element,
      }
    })

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img width={12} src={dropIcon} alt="drop-down" />
      </components.DropdownIndicator>
    )
  }

  const handlechange = ({ value, label }) => {
    console.log(value, '-----> value')
    console.log(label, '-----> label')
  }

  return (
    <>
      <div className="main-filter">
        <div>
          <p>Status</p>
          <Select
            options={statusItems}
            onChange={(e) => handlechange(e)}
            placeholder="All"
            components={{ DropdownIndicator }}
          />
        </div>
        <Select
          options={authorItems}
          onChange={(e) => handlechange(e)}
          placeholder="All"
          components={{ DropdownIndicator }}
        />
        <Select
          options={statusItems}
          placeholder="All"
          components={{ DropdownIndicator }}
        />
        <Select
          options={statusItems}
          placeholder="All"
          components={{ DropdownIndicator }}
        />
      </div>
    </>
  )
}

export default Filter
