// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  const pAequorFactory = (specimenNum, dna) => {
    if (!Array.isArray(dna) || dna.length !== 15) {
      throw new Error("DNA must be an array of 15 bases.");
    }
    return {
      specimenNum: specimenNum,
      dna: dna,
  
      // Mutate method: This method simulates a mutation by randomly selecting a base in the DNA and changing it to a different base.
      mutate() {
        // Randomly select an index in the DNA array
        const randomIndex = Math.floor(Math.random() * this.dna.length);
        const currentBase = this.dna[randomIndex];
  
        // Possible bases excluding the current one
        const dnaBases = ["A", "T", "C", "G"];
        const newBases = dnaBases.filter((base) => base !== currentBase);
  
        // Select a new base that is different from the current one
        this.dna[randomIndex] =
          newBases[Math.floor(Math.random() * newBases.length)];
  
        return this.dna;
      },
  
      // Compare DNA method
      compareDNA(otherPAequor) {
        let commonBases = 0; // Counter for identical bases
        // Iterate over each base in the DNA strand
        // Compare each base in the DNA strand
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === otherPAequor.dna[i]) {
            commonBases++;
          }
        }
  
        // Calculate percentage of similarity
        const similarityPercentage = (
          (commonBases / this.dna.length) *
          100
        ).toFixed(2);
  
        // Print the message
        console.log(
          `Specimen #${this.specimenNum} and Specimen #${otherPAequor.specimenNum} have ${similarityPercentage}% DNA in common.`
        );
      },
  
      willLikelySurvive() {
        let survivalBases = this.dna.filter(
          (base) => base === "C" || base === "G"
        ).length;
        let survivalRate = (survivalBases / this.dna.length) * 100;
        return survivalRate >= 60;
      },
  
      // Complementary DNA strand method
      complementStrand() {
        const complement = { A: "T", T: "A", C: "G", G: "C" };
        return this.dna.map((base) => complement[base]);
      },
    };
  };
  
  // Array to store 30 surviving organisms
  const survivingPAequor = [];
  
  let id = 1; // Start specimen numbers from 1
  
  while (survivingPAequor.length < 30) {
    let newOrganism = pAequorFactory(id, mockUpStrand());
  
    if (newOrganism.willLikelySurvive()) {
      survivingPAequor.push(newOrganism);
      id++; // Increment specimen number for uniqueness
    }
  }
  
  // Print out the 30 surviving organisms
  console.log(survivingPAequor);
  