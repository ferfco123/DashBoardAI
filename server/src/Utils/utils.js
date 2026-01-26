export const getIsoWeekRange = (year, week) => {
    const simple = new Date(year, 0, 1 + (week - 1) * 7)
    const dow = simple.getDay()
    const monday = dow <= 4 ? new Date(simple.setDate(simple.getDate() - simple.getDay() + 1)) :
        new Date(simple.setDate(simple.getDate() + 8 - simple.getDay()))

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    return {
        from: monday,
        to: sunday
    }
}