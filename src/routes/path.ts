const paths = {
  root: "/",
  thread: {
    root: "/thread",
    details: (id: string) => `/thread/${id}`,
  },
};

export default paths;
