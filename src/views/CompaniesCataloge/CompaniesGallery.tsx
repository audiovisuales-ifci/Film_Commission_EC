import { Typography } from '@mui/material'
import styles from './CompanyGallery.module.css'
import { useCompanies } from '../../hooks/useCompanies'
import { AppDispatch } from '../../Redux/store'
import { setLoader, setNotification } from '../../Redux/notificationReducer'
import { useLanguageSelected } from '../../hooks/useLanguages'
import backgroundImage from '../../assets/images/background_companies.png'
import CompanyCard from './components/CompanyCard'
import { CompanyServiceType } from '../../types'
import { useDispatch } from 'react-redux'

const CompaniesGallery = () => {
  const { companies: allCompanies, loading, error } = useCompanies()
  const { suppliersSection: text } = useLanguageSelected()
  const dispatch = useDispatch<AppDispatch>()

  if (loading) {
    dispatch(setLoader(true))
  }

  if (error) {
    dispatch(
      setNotification({
        style: 'error',
        text: error,
      }),
    )
  }

  const filterPublicCompanies = (
    companies: CompanyServiceType[],
  ): CompanyServiceType[] => {
    const companiesFiltered = companies.filter((company) => company.public)

    for (let i = companiesFiltered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[companiesFiltered[i], companiesFiltered[j]] = [
        companiesFiltered[j],
        companiesFiltered[i],
      ]
    }
    return companiesFiltered
  }

  let companies: CompanyServiceType[] = []

  if (allCompanies && allCompanies.length > 0) {
    dispatch(setLoader(false))
    companies = filterPublicCompanies(allCompanies)
  }

  return (
    <>
      <div className={styles.gallery__container}>
        <Typography variant="h2">{text.titulo.toUpperCase()}</Typography>
        <div className={styles.background}>
          <img src={backgroundImage} />
        </div>
        <div className={styles.cards__container}>
          {companies.map((company, i) => (
            <CompanyCard key={i} company={company} />
          ))}
        </div>
      </div>
    </>
  )
}

export default CompaniesGallery
