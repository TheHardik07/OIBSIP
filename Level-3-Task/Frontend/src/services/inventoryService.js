import api from "./api";

export const getBases = () => api.get("/pizza/bases");
export const getSauces = () => api.get("/pizza/sauces");
export const getCheeses = () => api.get("/pizza/cheeses");
export const getVeggies = () => api.get("/pizza/veggies");
