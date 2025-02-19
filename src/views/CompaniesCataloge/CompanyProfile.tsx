import { useParams } from 'react-router-dom'
import { useLanguageSelected } from '../../hooks/useLanguages'
import styles from './CompanyProfile.module.css'
import background from '../../assets/images/stacked-steps-haikei.png'
import { Typography } from '@mui/material'
import DescriptionCompanCard from './components/DescriptionCompanyCard'
import InfoCompanyCard from './components/InfoCompanyCard'
import MediaCompanyCard from './components/MediaCompanyCard'
import { useCompany } from '../../hooks/useCompany'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../Redux/store'
import { setLoader, setNotification } from '../../Redux/notificationReducer'
import VideoCompany from './components/VideoCompany'

const CompanyProfile = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { company, loading, error } = useCompany(id ?? null)
  const { idioma, companyProfile } = useLanguageSelected()

  if (loading) {
    dispatch(setLoader(true))
  }

  if (company) {
    dispatch(setLoader(false))
  }

  console.log(company)

  if (error) {
    dispatch(
      setNotification({
        style: 'error',
        text: error,
      }),
    )
  }

  return (
    <>
      {company && (
        <>
          <div className={styles.background__header}>
            <img src={background} />
          </div>
          <div className={styles.container}>
            <Typography variant="h2" color="secondary">
              {company.company.toUpperCase()}
            </Typography>
            <div className={styles.container__content}>
              <DescriptionCompanCard language={idioma} company={company} />
              <InfoCompanyCard company={company} text={companyProfile} />
            </div>
            <VideoCompany
              plataform={company.typeVideo}
              urlVideo={company.urlVideo}
            />
            <MediaCompanyCard company={company} text={companyProfile} />
          </div>
        </>
      )}
    </>
  )
}

export default CompanyProfile
