import './components/sign-up/sign-up';

var dateMask = IMask(document.getElementById('birthDate'), {
  mask: Date,
  min: new Date(1990, 0, 1),
  max: new Date(),
  lazy: false,
});
