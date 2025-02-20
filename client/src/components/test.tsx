<div className="h-20 mb-12 flex items-center justify-center">
  {" "}
  {roles.map((role, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 4, duration: 0.5 }}
      className="absolute code-container"
      style={{
        opacity: index === 0 ? 1 : 0,
        transform: "translateY(-50%)",
        top: "50%",
      }}
    >
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          times: [0, 0.2, 0.8, 1],
          duration: 4,
          delay: index * 4,
          repeat: Infinity,
          repeatDelay: roles.length * 4 - 4,
        }}
        className="typing-effect"
      >
        {" "}
        {role}{" "}
      </motion.div>{" "}
    </motion.div>
  ))}{" "}
</div>;
