import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/Select/MySelect'

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
        <MyInput
          value={filter.query}
          onChange={(e) => setFilter({...filter, query: e.target.value})}
          placeholder="find"
        />
        <MySelect
          value={filter.sort}
          onChange={(selectedSort) => setFilter({...filter, sort: selectedSort})}
          defaultValue="sort for"
          options={[
            { value: "title", name: "from name" },
            { value: "body", name: "from discriptions" },
          ]}
        />
      </div>
  )
}

export default PostFilter