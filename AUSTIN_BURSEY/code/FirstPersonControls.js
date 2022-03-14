
var FirstPersonControls = function ( object, domElement ) {
	if ( domElement === undefined ) {
		domElement = document;
	}

	this.object = object;
	this.domElement = domElement;
	this.enabled = true;
	this.movementSpeed = 10;
	this.lookSpeed =  0.115;
	this.activeLook = true;
	this.mouseX = 0;
	this.mouseY = 0;
	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.viewHalfX = 0;
	this.viewHalfY = 0;
	var latitude = 0;
	var longitude = 0;
	var lookDirection = new THREE.Vector3();
	var spherical = new THREE.Spherical();
	var target = new THREE.Vector3();

	if ( this.domElement !== document ) {
		this.domElement.setAttribute( 'tabindex', - 1 );
	}

	this.resize = function () {
		if ( this.domElement === document ) {
			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;
		} else {
			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;
		}
	};

	this.onMouseMove = function ( event ) {
		if ( this.domElement === document ) {
			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;
		} else {
			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
		}

	};

	this.onKeyDown = function ( event ) {

		switch ( event.keyCode ) {			
			case 87:
				this.moveForward = true;
				break;			
			case 65:
				this.moveLeft = true;
				break;		
			case 83:
				this.moveBackward = true;
				break;
			case 68:
				this.moveRight = true;
				break;
		}
	};

	this.onKeyUp = function ( event ) {

		switch ( event.keyCode ) {
			case 87:
				this.moveForward = false;
				break;
			case 65:
				this.moveLeft = false;
				break;
			case 83:
				this.moveBackward = false;
				break;
			case 68:
				this.moveRight = false;
				break;

		}

	};

	this.lookAt = function ( x, y, z ) {
		if ( x.isVector3 ) {
			target.copy( x );
		} else {
			target.set( x, y, z );
		}
		this.object.lookAt( target );
		setOrientation( this );
		return this;
	};

	this.update = function () {
		var targetPosition = new THREE.Vector3();
		return function update( delta ) {
			if ( this.enabled === false ) return;
		
			var actualMoveSpeed = delta * this.movementSpeed;

			if ( this.moveForward ){
				 this.object.translateZ( - actualMoveSpeed  );
			}
			if ( this.moveBackward ){
				this.object.translateZ( actualMoveSpeed );
			} 

			if ( this.moveLeft ){
				this.object.translateX( - actualMoveSpeed );
			} 
			if ( this.moveRight ){
				this.object.translateX( actualMoveSpeed );
			} 

			var actualLookSpeed = delta * this.lookSpeed;

			if ( ! this.activeLook ) {
				actualLookSpeed = 0;
			}

			
			longitude -= this.mouseX * actualLookSpeed;
			latitude -= this.mouseY * actualLookSpeed ;

			latitude = Math.max( - 85, Math.min( 85, latitude ) );

			var phi = THREE.MathUtils.degToRad( 90 - latitude );
			var theta = THREE.MathUtils.degToRad( longitude );


			var position = this.object.position;
			
			position.y = 1 
			targetPosition.setFromSphericalCoords( 1, phi, theta ).add( position );
			
			this.object.lookAt( targetPosition );

		};

	}();

	this.dispose = function () {
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );
	};

	var _onMouseMove = bind( this, this.onMouseMove );
	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );

	this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	window.addEventListener( 'keydown', _onKeyDown, false );
	window.addEventListener( 'keyup', _onKeyUp, false );

	function bind( scope, fn ) {
		return function () {
			fn.apply( scope, arguments );
		};
	}

	function setOrientation( controls ) {
		var quaternion = controls.object.quaternion;
		lookDirection.set( 0, 0, - 1 ).applyQuaternion( quaternion );
		spherical.setFromVector3( lookDirection );
		latitude = 90 - THREE.MathUtils.radToDeg( spherical.phi );
		longitude = THREE.MathUtils.radToDeg( spherical.theta );

	}
	this.resize();
	setOrientation(this);
};

export { FirstPersonControls };