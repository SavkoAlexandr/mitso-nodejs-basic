const parseEnv = () => {
  // Write your code here

  const mitsoVars = [];
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith("MITSO_")) {
      mitsoVars.push(`${key}= ${value}`);
    }
  }

  console.log(mitsoVars.join(";"));
};

parseEnv();
