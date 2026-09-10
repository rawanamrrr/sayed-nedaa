export const MapFrame = () => {
  return (
    <div className="absolute box-border caret-transparent table h-[343px] outline-[3px] w-screen z-[3] left-0 top-px">
      <div className="box-border caret-transparent table-cell outline-[3px] align-top w-full bg-center">
        <div className="items-center box-border caret-transparent flex h-full justify-center outline-[3px]">
          <iframe
            src="https://www.google.com/maps?q=ElQasr+Hall,+Talkha,+Egypt&output=embed"
            className="box-border caret-transparent h-[335px] min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-[335px] rounded-[15px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
