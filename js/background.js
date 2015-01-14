/**
 * Created by fion on 2015/1/14.
 */
(function () {
    var MESH = {
        width: 1.2,
        height: 1.2,
        depth: 10,
        segments: 16,
        slices: 8,
        xRange: 0.8,
        yRange: 0.1,
        zRange: 1.0,
        ambient: '#555555',
        diffuse: '#FFFFFF',
        speed: 0.002
    };
    var LIGHT = {
        count: 2,
        xyScalar: 1,
        zOffset: 100,
        ambient: '#42b8ea',
        diffuse: '#4EC0FF',
        speed: 0.001,
        gravity: 1200,
        dampening: 0.95,
        minLimit: 10,
        maxLimit: null,
        minDistance: 20,
        maxDistance: 400,
        autopilot: false,
        draw: true,
        bounds: FSS.Vector3.create(),
        step: FSS.Vector3.create(
            Math.randomInRange(0.2, 1.0),
            Math.randomInRange(0.2, 1.0),
            Math.randomInRange(0.2, 1.0)
        )
    };

    var container = document.getElementById('container');
    var renderer = new FSS.CanvasRenderer();
    var scene = new FSS.Scene();

    var light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
    light.ambientHex = light.ambient.format();
    light.diffuseHex = light.diffuse.format();
    light.mass = Math.randomInRange(0.5, 1);
    light.velocity = FSS.Vector3.create();
    light.acceleration = FSS.Vector3.create();
    light.force = FSS.Vector3.create();
    light.ring = document.createElementNS(FSS.SVGNS, 'circle');
    light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
    light.ring.setAttributeNS(null, 'stroke-width', '0.5');
    light.ring.setAttributeNS(null, 'fill', 'none');
    light.ring.setAttributeNS(null, 'r', '10');

    // Core SVG Circle
    light.core = document.createElementNS(FSS.SVGNS, 'circle');
    light.core.setAttributeNS(null, 'fill', light.diffuseHex);
    light.core.setAttributeNS(null, 'r', '4');

    var geometry = new FSS.Plane(window.innerWidth, window.innerHeight, 6, 4);
    var material = new FSS.Material(MESH.ambient, MESH.diffuse);
    var mesh = new FSS.Mesh(geometry, material);
    var now, start = Date.now();

    function initialise() {
        scene.add(mesh);
        scene.add(light);
        container.appendChild(renderer.element);
        window.addEventListener('resize', resize);
    }

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        now = Date.now() - start;
        light.setPosition(300 * Math.sin(now * 0.001), 200 * Math.cos(now * 0.0005), 60);
        renderer.render(scene);
        requestAnimationFrame(animate);
    }

    initialise();
    resize();
    animate();
})();