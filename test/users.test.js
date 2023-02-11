const test = require('ava')
const { getUser } = require('../src')

const NS = {
  name: 'Sebelius'
}

test.beforeEach(async t => {
  await new Promise(resolve => setTimeout(resolve, 5000))
})

test('getUser() returns the user for Sebelius with name only', async t => {
  try {
    const data = await getUser(NS.name)
    console.log(data)
    t.is(typeof data, 'object')
    t.is(data.username, 'Sebelius')
    t.is(data.profilePictureLink, 'https://cdn.myanimelist.net/images/userimages/16289646.jpg?t=1676115000')
    t.is(data.gender, 'Male')
    t.is(data.birthday, 'Jun 16, 1964')
    t.is(data.joined, 'Feb 11, 2023')
    t.is(data.animeDays, '0.8')
    t.is(data.animeMeanScore, '10.00')
    t.is(data.mangaDays, '0.3')
    t.is(data.mangaDays, '0.00')
    t.is(data.favoriteAnime[0], 'Toradora!')
    t.is(data.favoriteAnime[1], 'Eromanga-sensei!')
    t.is(data.favoriteManga[0], 'Boruto: Naruto Next Generations')
  } catch (e) {
    t.fail()
  }
})

// errors

test('getUser returns an error if called with no arguments', async t => {
  try {
    await getUser()
  } catch (e) {
    t.true(e.message === '[Mal-Scraper]: No name received.')
  }
})

test('getUser returns an error if called with malformed object', async t => {
  try {
    await getUser({ name: NS.name })
  } catch (e) {
    t.true(e.message === '[Mal-Scraper]: Malformed input. Name is malformed or missing.')
  }
})
