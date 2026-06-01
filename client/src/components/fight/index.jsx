import { useState, useEffect } from 'react';
import { Box, Button, Divider, Paper } from '@mui/material';
import { getFighters } from '../../services/domainRequest/fightersRequest';
import { createFight, getFights } from '../../services/domainRequest/fightRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';
import FightHistory from '../fightHistory';

export default function Fight() {
    const [fighters, setFighters] = useState([]);
    const [fighter1, setFighter1] = useState(null);
    const [fighter2, setFighter2] = useState(null);
    const [fightResult, setFightResult] = useState(null);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [fights, setFights] = useState([]);

    useEffect(() => {
        getFighters().then((data) => {
            if (data && !data.error) {
                setFighters(data);
            }
        });
    }, []);

    const onCreate = (fighter) => {
        setFighters((prev) => [...prev, fighter]);
    };

    const fighter1List = fighter2 ? fighters.filter((f) => f.id !== fighter2.id) : fighters;
    const fighter2List = fighter1 ? fighters.filter((f) => f.id !== fighter1.id) : fighters;

    const onSubmit = async () => {
        const result = await createFight({ fighter1, fighter2 });

        if (!result?.log?.length) {
            return;
        }
        const winner = result.winner;

        setFightResult(`🏆 ${winner} wins!`);
    };

    const handleOpenHistory = async () => {
        const data = await getFights();

        if (data && !data.error) {
            setFights(data);
        }

        setHistoryOpen(true);
    };

    const handleCloseHistory = () => {
        setHistoryOpen(false);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <NewFighter onCreated={onCreate} />
            <Paper elevation={2} sx={{ width: '70%', mx: 'auto', mt: 3, display: 'flex', alignItems: 'flex-start' }}>
                <Fighter selectedFighter={fighter1} onFighterSelect={setFighter1} fightersList={fighter1List} />
                <Divider orientation="vertical" flexItem />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center', px: 2, pt: 2 }}>
                    <Button variant="contained" color="secondary" onClick={onSubmit} disabled={!fighter1 || !fighter2}>
                        Start Fight
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleOpenHistory}
                    >
                        View Fight History
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Fighter selectedFighter={fighter2} onFighterSelect={setFighter2} fightersList={fighter2List} />
            </Paper>
            {fightResult && (
                <Paper sx={{ mt: 2, p: 2 }}>
                    {fightResult}
                </Paper>
            )}
            <FightHistory open={historyOpen} onClose={handleCloseHistory} fights={fights} />
        </Box>
    );
}
