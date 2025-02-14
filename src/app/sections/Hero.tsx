export default function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-fill mx-auto flex flex-col sm:mt-36 mt-20 gap-3">
        <p className="text-white text-xl font-medium">
          Welcome to my portfolio
        </p>
        <h1 className="text-white text-4xl font-medium">
          I'm a <span className="text-blue-500">Software Engineer</span>
        </h1>
        <div className="w-full h-full absolute inset-0">
          <Canvas>
            <Suspense fallback={null}>
              <PerspectiveCamera
                makeDefault
                position={[0, 0, 30]}
              />
              <HackerRoom
                scale={0.07}
                position={[0, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
              />
              <ambientLight intensity={1} />
              <directionalLight
                position={[10, 10, 10]}
                intensity={0.5}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
