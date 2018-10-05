import React, { Component } from "react";

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: "이름",
      phone: "010-0000-0000",
      id: 0
    }
  };

  state = {
    // 수정 버튼을 누르면  editing 값을 true로
    // true일때 텍스트 형태이던 값을 input 으로 변경
    editing: false,
    name: "",
    phone: ""
  };

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  // true -> false, false -> true로 반전시키는 함수
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  // input에서 onChange 이벤트 발생 시 호출
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // editing 값이 바뀔 때
    // false -> true
    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        phone: info.phone
      });
    }
    // true -> false
    if (prevState.editing && !this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 수정이 아니고, info값이 같을 때
    if (
      !this.state.editing &&
      !nextState.editing &&
      nextProps.info === this.props.info
    ) {
      return false;
    }
    return true;
  }
  render() {
    console.log("render PhoneInfo " + this.props.info.id);
    const style = {
      border: "1px solid black",
      padding: "8px",
      margin: "8px"
    };
    const { editing } = this.state;

    // 수정일때
    if (editing) {
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }
    // info가 undefined일 때는 비구조화 할당을 통해
    // 내부의 값 받아 올 수 없음 그래서 defaultProps에
    // info 기본 값 설정
    // 그냥 일반일때
    const { name, phone } = this.props.info;
    return (
      <div style={style}>
        <div>
          <b>{name}</b>
        </div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>적용</button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
