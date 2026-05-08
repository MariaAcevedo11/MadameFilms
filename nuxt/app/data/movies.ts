export type Movie = {
  id: number;
  title: string;
  description: string;
  cast: string;
  director: string;
  releaseDate: string;
  genre: string;
  durationMin: number;
  country: string;
  language: string;
  image: string;
  
  actressId: number;
};

export const movies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    description:
      "Un grupo de astronautas viaja a través de un agujero negro para buscar un nuevo hogar para la humanidad.",
    cast: "Matthew McConaughey, Anne Hathaway",
    director: "Christopher Nolan",
    releaseDate: "2014-11-07",
    genre: "Science Fiction",
    durationMin: 169,
    country: "United States",
    language: "English",
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    actressId: 1,
  },

  {
    id: 2,
    title: "Parasite",
    description:
      "Una familia con dificultades económicas se infiltra en la vida de una familia adinerada.",
    cast: "Song Kang-ho, Choi Woo-shik",
    director: "Bong Joon-ho",
    releaseDate: "2019-05-30",
    genre: "Thriller",
    durationMin: 132,
    country: "South Korea",
    language: "Korean",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
    actressId: 2,
  },

  {
    id: 3,
    title: "The Dark Knight",
    description:
      "Batman enfrenta al Joker, un criminal que busca sembrar el caos en Gotham.",
    cast: "Christian Bale, Heath Ledger",
    director: "Christopher Nolan",
    releaseDate: "2008-07-18",
    genre: "Action",
    durationMin: 152,
    country: "United States",
    language: "English",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
    actressId: 3,
  },
];
