const one = () => () => 1;
const lessThan = (max) => (n) => n < max;
const plusplus = (pp = 1) => (n) => n + pp;
const divisibleBy = (d) => (n) => n % d === 0;

const For = (start, cont, iter, cb) => (n = start()) => {
  while (cont(n)) {
    cb(n);
    n = iter(n);
  }
};

const sayNumber = () => (s) => console.log(s);
const say = (s) => () => console.log(s);

// not realy happy with how this part came out but I'm not spending more than 30 minutes on this
const If = (pred) => new IfCond(pred);
class IfCond {
  constructor(pred) {
    this.preds = [pred];
    this.cbs = [];
  }
  Then(cb) {
    this.cbs = [...this.cbs, cb];
    return this;
  }
  Elif(pred) {
    this.preds = [...this.preds, pred];
    return this;
  }
  Else(cb) {
    this.cbs = [...this.cbs, cb];
    return (...args) => {
      let idx = this.preds.findIndex((pred) => pred.apply(null, args));
      if (idx === -1) {
        idx = this.cbs.length - 1;
      }
      const cb = this.cbs[idx];
      cb.apply(null, args);
    };
  }
}

For(
  one(),
  lessThan(16),
  plusplus(),
  If(divisibleBy(15))
    .Then(say("fizzbuzz"))
    .Elif(divisibleBy(3))
    .Then(say("fizz"))
    .Elif(divisibleBy(5))
    .Then(say("buzz"))
    .Else(sayNumber())
)();
