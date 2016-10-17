const tpl = require('../templates/partials/events/jobs-placement.nunjucks')
const data = require('../../data/jobs.json')
const shuffle = require('shuffle-array')

const jobPlacement = document.querySelector('.jsJobsPlacement')
if (jobPlacement) {
  let companies = data.jobs
  let jobs = companies.reduce((initial, curr) => {
    let newMap = curr.jobs.map(el => {
      el.employer = curr.employer
      el.image = curr.image
      return el
    })
    return initial.concat(newMap)
  }, [])

  const html = tpl.render({
  jobs: shuffle(jobs).slice(0,3)
})

  jobPlacement.innerHTML = html
}
