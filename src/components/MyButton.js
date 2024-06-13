const MyButton = ({text ,type = "default", onClick}) => {

  const btnType = ['positive', 'negative'].includes(type) ? type : 'default'
  return (
    <button className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  )
}



export default MyButton