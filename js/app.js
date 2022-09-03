var app = angular.module("myApp", ["ngRoute"]);

app.controller("appCtrl", function ($scope, $http, $location, $interval) {
  $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
  $scope.handleChange = function (search) {
    console.log(search);
  };

  $scope.star = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 }
  ];
  // Getting data from JSON file, using $http service
  $http
    .get("data.json")
    .then((response) => {
      $scope.products = response.data.product;
      $scope.cates = response.data.category;
      $scope.manufacturals = response.data.manufactural;
      console.log(response.data.category);
    })
    .catch((error) => {
      console.log(error);
    });
  // Get value from searchbox, and navigate to results page and check data to return products list
  $scope.submitForm = function (search) {
    $scope.result = search;
    $location.path("/result");
    $scope.results = $scope.products.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log($scope.results);
  };

  // Display date - time
  var controller = this;
  controller.date = new Date();
  $interval(function () {
    controller.date = new Date();
  }, 1000);
  $interval(function () {
    window.location.href = window.location.href + "?rnd=" + Math.random;
  }, 1800000);

  // Filter Services
  $scope.price_slider = {
    start: [0, 90000000],
  };

  $scope.priceFiltering = function () {
    $scope.minPrice = $scope.price_slider.start[0];
    $scope.maxPrice = $scope.price_slider.start[1];
    $scope.pricefilter = function (product) {
      if (
        product.price <= $scope.maxPrice &&
        product.price >= $scope.minPrice
      ) {
        return product;
      }
    };
  };

  $scope.ton_slider = {
    start: [9000, 50000],
  };

  $scope.tonFiltering = function () {
    $scope.minTon = $scope.ton_slider.start[0];
    $scope.maxTon = $scope.ton_slider.start[1];
    $scope.tonfilter = function (product) {
      console.log(product.Cooling_capacity);
      if (
        product.Cooling_capacity <= $scope.maxTon &&
        product.Cooling_capacity >= $scope.minTon
      ) {
        return product;
      }
    };
  };

  $scope.manuFiltering = function (id) {
    $scope.manuUid = id;
    $scope.profilter = function (product) {
      if (product.manuId == $scope.manuUid) {
        return product;
      }
    };
  };
});

//Details service
app.controller(
  "detailController",
  function ($scope, $routeParams, $location, $http) {
    $scope.uid = $routeParams.id;
    console.log($scope.uid);

    $http
      .get("data.json")
      .then((response) => {
        $scope.products = response.data.product;
      })
      .catch((error) => {
        console.log(error);
      });

    $scope.qty = 1;

    $scope.minus = function () {
      if ($scope.qty <= 1) {
        $scope.qty = 1;
      } else {
        $scope.qty--;
      }
    };
    $scope.plus = function () {
      $scope.qty++;
    };
    $scope.spinnerText = function () {
      return $scope.qty;
    };

    $scope.addToCart = function (item, qty, rated) {
      $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
      $scope.data = {
        cart: { item, qty, rated },
      };
      $scope.carts.push($scope.data);
      localStorage.setItem("cart", JSON.stringify($scope.carts));
      console.log($scope.carts);
      $location.path("/cart");
    };
  }
);

// Filter Services
app.controller(
  "filterController",
  function ($scope, $routeParams, $location, $http) {
    $scope.uid = $routeParams.id;
    console.log($scope.uid);

    $http
      .get("data.json")
      .then((response) => {
        $scope.categorys = response.data.category;
        $scope.products = response.data.product;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

// Contact Services
app.controller(
  "contactCtrl",
  function ($scope, $routeParams, $location, $http) {
    $scope.emails = {
      EMAIL_FORMAT:
        /^\w+([\.-]?\w+)*@(list.)?gmail.com+((\s*)+,(\s*)+\w+([\.-]?\w+)*@(list.)?gmail.com)*$/,
      EMAIL_FORMAT_HELP: "Email... Ex: example@example.com",
    };
    $scope.submit = function (name, email, subject, mess) {
      $scope.contacts = JSON.parse(localStorage.getItem("contact") || "[]");
      $scope.data = {
        name,
        email,
        subject,
        mess,
      };
      if (!name || !email || !subject) {
        alert("Name, Email and Subject must be provided");
      } else {
        $scope.contacts.push($scope.data);
        localStorage.setItem("contact", JSON.stringify($scope.contacts));
        alert("Thanks for contacting");
        console.log($scope.contacts);
        $location.path("/");
      }
    };
  }
);

// Register Services
app.controller(
  "registerController",
  function ($scope, $routeParams, $location, $http) {
    $scope.match = function () {
      $scope.isMatch = angular.equals($scope.pass, $scope.PASS);
    };
    console.log($scope.isMatch);
    $scope.emails = {
      EMAIL_FORMAT:
        /^\w+([\.-]?\w+)*@(list.)?gmail.com+((\s*)+,(\s*)+\w+([\.-]?\w+)*@(list.)?gmail.com)*$/,
      EMAIL_FORMAT_HELP: "Email... Ex: example@example.com",
    };

    $scope.register = function (name, email, pass, PASS) {
      $scope.users = JSON.parse(localStorage.getItem("user") || "[]");
      $scope.data = {
        name,
        email,
        pass,
        PASS,
      };
      if (
        !name ||
        !email ||
        !pass ||
        !PASS ||
        angular.equals($scope.pass, $scope.PASS) == false
      ) {
        alert("Name, Email and Password must be provided");
      } else {
        $scope.users.push($scope.data);
        localStorage.setItem("user", JSON.stringify($scope.users));
        alert("Register Successfully");
        console.log($scope.users);
        $location.path("/login");
      }
    };
  }
);

// Login Services
app.controller("loginController", function ($scope, $location) {
  $scope.lgs = JSON.parse(localStorage.getItem("user") || "[]");

  $scope.login = function (name, pass) {
    $scope.lgs.map((item) => {
      $scope.lg = item;
    });
    if (
      $scope.lg.name !== name ||
      $scope.lg.pass !== pass ||
      !$scope.lg.name ||
      !$scope.lg.pass
    ) {
      alert("Invalid ");
    } else {
      $location.path("/");
      alert("Login Successfully");
    }
  };
});

// Carts Services
app.controller("cartCtrl", function ($scope) {
  $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
  console.log($scope.carts);

  $scope.handleAction = function (id) {
    $scope.find = $scope.carts.findIndex((item) => item.cart.item.id === id);
    $scope.carts.splice($scope.find, 1);
    localStorage.setItem("cart", JSON.stringify($scope.carts));
    console.log($scope.find);
  };

  $scope.total = 0;
  $scope.carts.forEach((items) => {
    $scope.total += (items.cart.item.price * items.cart.qty);
  })
});

// Test
app.controller(
  "testController",
  function ($scope, $routeParams, $location, $http) {
    $scope.email = {
      EMAIL_FORMAT:
        /^\w+([\.-]?\w+)*@(list.)?gmail.com+((\s*)+,(\s*)+\w+([\.-]?\w+)*@(list.)?gmail.com)*$/,
      EMAIL_FORMAT_HELP: "Email... Ex: example@example.com",
    };
  }
);

// Config Routing by RouteProvider
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "pages/home.html",
    })
    .when("/products", {
      templateUrl: "pages/product.html",
    })
    .when("/result", {
      templateUrl: "pages/result.html",
    })
    .when("/menu", {
      templateUrl: "pages/menu.html",
    })
    .when("/detail/:id", {
      templateUrl: "pages/detail.html",
    })

    .when("/about", {
      templateUrl: "pages/about.html",
    })
    .when("/faq", {
      templateUrl: "pages/faq.html",
    })
    .when("/contact", {
      templateUrl: "pages/contact.html",
    })
    .when("/cart", {
      templateUrl: "pages/cart.html",
    })
    .when("/login", {
      templateUrl: "pages/login.html",
    })
    .when("/register", {
      templateUrl: "pages/register.html",
    })
    .when("/test", {
      templateUrl: "pages/test.html",
    });
});
