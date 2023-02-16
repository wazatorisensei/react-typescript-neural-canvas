import React, { useRef, useEffect } from 'react';

const NeuralNetworkCanvas = () => {
  const canvasRef = useRef(null) as any;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let nodes: { x: number; y: number; size: number; }[] = [];
    let connections: { from: number; to: number; thickness: number; }[] = [];
    let animation: number;

    // Initialize nodes
    for (let i = 0; i < 5; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 50 + 50,
      });
    }

    // Initialize connections
    for (let i = 0; i < nodes.length - 1; i++) {
      connections.push({
        from: i,
        to: i + 1,
        thickness: Math.random() * 5 + 2,
      });
    }

    // Function to animate the neural network
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(connection => {
        ctx.beginPath();
        ctx.lineWidth = connection.thickness;
        ctx.moveTo(nodes[connection.from].x, nodes[connection.from].y);
        ctx.lineTo(nodes[connection.to].x, nodes[connection.to].y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
        ctx.fill();
      });

      animation = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <canvas ref={canvasRef} width={1920} height={1200} />
  );
};

export default NeuralNetworkCanvas;