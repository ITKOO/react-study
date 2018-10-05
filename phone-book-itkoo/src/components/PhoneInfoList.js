import React, { Component } from "react";
import PhoneInfo from "./PhoneInfo";

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn("onRemove not defined"),
    onUpdate: () => console.warn("onUpdate not defined")
  };

  //TODO : 작동되지 않음, 이유 모름
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState); // why...null?
    return nextProps.data !== this.props.data;
  }

  render() {
    console.log("render PhoneInfoList");
    const { data, onRemove, onUpdate } = this.props;
    // 배열을 렌더링 하게 될 때에는 꼭 고유값을 key 로 사용해야 함!!! 여기서는 id!!
    const list = data.map(info => (
      <PhoneInfo
        key={info.id}
        info={info}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ));
    return <div>{list}</div>;
  }
}

export default PhoneInfoList;
