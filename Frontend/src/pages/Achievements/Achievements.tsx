import React from 'react'
import './Achievements.css'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import Badge from '~/components/Badge/Badge'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

type Stats = any;

type Track = {
  colors: {
    rim: string;
    ribbon: string[];
    gradient: string[];
  },
  achievements: Achievement[];
}

type Achievement = {
  icon: string;
  description: string;
  track: string;
  done: (stats: Stats) => boolean;
  progress: (stats: Stats) => string;
}

const statsQueryFn = async (account_id?: string) => {
  account_id = '0x889befc77295680009ea41ecf3aa676bd7a8ad9b'

  if (!account_id)
    return Promise.reject()

  return await Promise.all([
    fetch(`https://eth.blockscout.com/api/v2/addresses/${account_id}/tokens?type=ERC-20`),
    fetch(`https://eth.blockscout.com/api/v2/addresses/${account_id}/tokens?type=ERC-721`),
    fetch(`https://eth.blockscout.com/api/v2/addresses/${account_id}/counters`),
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))    
}

const tracks: Record<string, Track> = {
  'holding_fts': {
    colors: {
      rim: '#FF9696',
      ribbon: ['#F84242', '#F23737'],
      gradient: ['#FF6161', '#FAEDED'],
    },
    achievements: [
      {
        icon: 'counter_5',
        description: 'Hold 5 or more fungible tokens',
        track: 'holding_fts',
        done: (stats: Stats) => Object.keys(stats[0].items).length > 5,
        progress: (stats: Stats) => `${Object.keys(stats[0].items).length} / 5`,
      },
    ],
  },
  'holding_nfts': {
    colors: {
      rim: '#9696FF',
      ribbon: ['#4242F8', '#3737F2'],
      gradient: ['#6161FF', '#EDEDFA'],
    },
    achievements: [
      {
        icon: 'timer_5_shutter',
        description: 'Hold 5 or more NFTs',
        track: 'txs_sent',
        done: (stats: Stats) => Object.keys(stats[1].items).length > 5,
        progress: (stats: Stats) => `${Object.keys(stats[1].items).length} / 5`,
      },
      {
        icon: 'timer_10',
        description: 'Hold 10 or more NFTs',
        track: 'txs_sent',
        done: (stats: Stats) => Object.keys(stats[1].items).length > 10,
        progress: (stats: Stats) => `${Object.keys(stats[1].items).length} / 10`,
      },
    ],
  },
  'txs_sent': {
    colors: {
      rim: '#96FF96',
      ribbon: ['#42F842', '#37F237'],
      gradient: ['#61FF61', '#EDFAED'],
    },
    achievements: [
      {
        icon: '1k',
        description: 'Send 1.000 transactions',
        track: 'txs_sent',
        done: (stats: Stats) => stats[2].transactions_count > 1000,
        progress: (stats: Stats) => `${stats[2].transactions_count} / 1k`,
      },
      {
        icon: '10k',
        description: 'Send 10.000 transactions',
        track: 'txs_sent',
        done: (stats: Stats) => stats[2].transactions_count > 10000,
        progress: (stats: Stats) => `${stats[2].transactions_count} / 10k`,
      },
    ],
  },
}

export default function Achievements() {
  const { address } = useAccount()
  const statsQuery = useQuery({ queryFn: () => statsQueryFn(address), queryKey: ['stats-query'] }) 

  return (
    <div className="achievements-page">
      {!!address && (
        <>
          <div className="title">Your Achievements</div>
          <div className="achievements-container">
            {statsQuery.status === 'loading' && <CircularProgress />}
            {statsQuery.status === 'error' && <p>{'Something went wrong :('}</p>}
            {statsQuery.status === 'success' && 
              Object.values(tracks).map((t: Track, i) => {
                const as = []
               
                for (const a of t.achievements) {
                  as.push(a)
                  if (!a.done(statsQuery.data))
                    break
                }

                return as.map((a, j) => (
                  <div className="achievement-infos" key={i.toString() + '_' + j.toString()}>
                    <Badge
                      className={`achievement ${a.done(statsQuery.data) ? '' : 'grayscale'}`}
                      id={i.toString()}
                      colors={t.colors}
                    >
                      <span className="material-symbols-outlined achievement-icon">
                        {a.icon}
                      </span>
                    </Badge>
                    <strong className="progress">{a.progress(statsQuery.data)}</strong>
                    <div className="description">{a.description}</div>
                  </div>
                ))
              }).flat()
            }
          </div>
          <Link to="/"> Go Home </Link>
        </>
      )}
    </div>
  )
}
