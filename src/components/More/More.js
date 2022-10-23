import "./More.css";

function More(props) {
  return (
    <section className="more">
      <button className="more__button link-opacity" onClick={props.onClick}>
        <p className="more__link">Ещё</p>
      </button>
    </section>
  );
}

export default More;
