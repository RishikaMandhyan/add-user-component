import '../App.css'

import Avatar from 'react-avatar';

export const UserList=({data=[], chipsSet, handleClick=()=>{}})=>{
    return (
        <div className="list">
        {data.map((item, index) => {
          return !chipsSet.has(item.id) ? (
            <div
              className="listItem"
              key={item.id}
              onMouseDown={() => handleClick(item, index)}
            >
              <Avatar name={`${item.firstName} ${item.lastName}`} size="35" round/>
              <div className="name">{`${item.firstName} ${item.lastName}`}</div>
              <div className="email">{item.email}</div>
            </div>
          ) : null;
        })}
      </div>
    )
}