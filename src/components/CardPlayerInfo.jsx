import { CardContext } from "./Card";
import { Fragment, useContext, useId, useRef } from "react";

function PlayerInfo() {
  const [data, pathname] = useContext(CardContext);
  const tooltipRef = useRef();
  const timeoutRef = useRef();
  const tooltipId = useId();

  const player = data[pathname].player;

  const showTooltip = (field) => {
    const tooltip = tooltipRef.current;
    const top = field.offsetTop - tooltip.offsetHeight;
    const left =
      field.offsetLeft + (field.offsetWidth - tooltip.offsetWidth) / 2;

    tooltip.style.top = `calc(${top}px - 0.5rem)`;
    tooltip.style.left = `${left}px`;

    tooltip.classList.add("visible");

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      tooltip.classList.remove("visible");
    }, 3000);
  };

  const hideTooltip = () => {
    tooltipRef.current.classList.remove("visible");
  };

  const copyThis = async (event) => {
    try {
      await navigator.clipboard.writeText(event.currentTarget.value);
      showTooltip(event.target);
    } catch {}
  };

  return (
    player && (
      <div className="player-info">
        {player.username && <h2>{player.username}</h2>}
        {player.legend && <p>{player.legend}</p>}
        <dl>
          {player.contact &&
            player.contact.map((item, i) => {
              return (
                <Fragment key={i}>
                  <dt>{item.title}</dt>
                  <dd>
                    {(item.type === "text" ||
                      !["field", "link"].includes(item.type)) &&
                      item.description}

                    {item.type === "field" && (
                      <input
                        type="text"
                        value={item.description}
                        readOnly
                        onClick={copyThis}
                        onBlur={hideTooltip}
                        className="field"
                        aria-describedby={tooltipId}
                      />
                    )}

                    {item.type === "link" && (
                      <a href={item.description.url} target="_blank">
                        {item.description.text ||
                          new URL(item.description.url).hostname}
                      </a>
                    )}
                  </dd>
                </Fragment>
              );
            })}
        </dl>
        <div id={tooltipId} className="tooltip" ref={tooltipRef} role="tooltip">
          ¡Copiado!
        </div>
      </div>
    )
  );
}

export default PlayerInfo;
