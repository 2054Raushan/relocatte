const promiseState = (isPending, isFulfilled, isRejected, data) => ({
    isPending,
    isFulfilled,
    isRejected,
    data,
});

export default promiseState;
