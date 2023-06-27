function fakeLatency(min, max) {
  return (req, res, next) => {
    setTimeout(next, Math.floor((Math.random() * (max - min)) + min));
  };
}

module.exports = fakeLatency;
