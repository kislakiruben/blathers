const ErrorGeneric = () => {
  const onClick = () => {
    window.location.reload();
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-700/60 rounded-lg text-slate-300 flex flex-col shadow-xl shadow-slate-900/40 px-10 py-16 mx-auto max-w-screen-md">
      <h2 className="font-bold text-xl text-center mb-4">
        Something went wrong
      </h2>
      <p className="text-center text-slate-400/80 mb-10">
        Oops! It seem something went wront, but we're not sure what.
      </p>
      <button
        className="backdrop-blur-xl bg-pink-500/50 border border-pink-500/70 font-bold rounded-lg text-pink-200 px-14 py-2 text-sm mx-auto shadow-[0_0_10px_0_rgba(236,72,153,0.5)] hover:bg-pink-500/60 hover:border-pink-500/80 hover:text-pink-100 transition-colors hover:shadow-[0_0_10px_0_rgba(236,72,153,0.6)]"
        onClick={onClick}
        type="button"
      >
        Reload the page
      </button>
    </div>
  );
};

export default ErrorGeneric;
