import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

// import MODEL from './assets/model_default.obj';
import MODEL from './assets/model.obj'
// import Texture from './assets/uv_grid_opengl.jpg'

const ThreeSceneControls = () => {
  let scene, camera, renderer, model, controls

  function init() {
    // const canvas = document.querySelector('.scene')
    scene = new THREE.Scene()

    // Camera setting
    const fov = 100
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.15
    const far = 1000

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 20) //x, y, z
    // camera.position.z = 20;

    // Render
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    // renderer.setClearColor('#DDD')
    renderer.setPixelRatio(window.devicePixelRatio)
    // renderer.setSize(window.innerWidth, window.innerHeight)
    // container = document.querySelector('.container')
    // document.body.appendChild(renderer.domElement)

    // Add a light
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.6)
    scene.add(pointLight)

    const light = new THREE.DirectionalLight(0x404040, 3)
    light.position.set(10, 20, 20)
    scene.add(light)

    // Model setting
    const loader = new OBJLoader()
    loader.load(MODEL, (object) => {
      model = object.children[0]
      // const texture = new THREE.TextureLoader().load(Texture)
      // object.traverse(function(child) {
      //   if (child instanceof THREE.Mesh) {
      //     child.material.map = texture
      //     // child.castShadow = true;
      //     // child.receiveShadow = true;
      //   }
      // })
      object.position.set(0, -3, 0)
      scene.add(object)
      animate()
      render()
    })

    controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', render) // use if there is no animation loop
    controls.minDistance = 12
    controls.maxDistance = 400
    controls.target.set(0, 0, -0.2)
    controls.update()

    window.addEventListener('resize', onWindowResize)
  }

  // Render
  function render() {
    renderer.render(scene, camera)
  }

  // Animate
  function animate() {
    requestAnimationFrame(animate)
    model.rotation.y += 0.01
    render()
  }

  // WindowResizeOptimization
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
  }

  useEffect(() => {
    const container = document.querySelector('.container')
    container.appendChild(renderer.domElement)
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  init()

  return <div className='container'></div>
}
export default ThreeSceneControls
