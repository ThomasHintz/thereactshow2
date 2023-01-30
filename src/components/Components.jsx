export function Box({ children, ...props }) {
  const classNames = Object.entries(props).reduce((acc, [k]) => `${acc} ${k}`, '')
  return (
    <div className={classNames}>
      {children}
    </div>
  );
};
