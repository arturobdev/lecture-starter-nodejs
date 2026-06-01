import { Button, Collapse, Dialog, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function FightHistory({ open, onClose, fights }) {
    const [selectedFight, setSelectedFight] = useState(null);

    const toggleLog = (fightId) => {
        setSelectedFight(
            selectedFight === fightId ? null : fightId
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle color="black">
                Fight History
            </DialogTitle>

            <DialogContent>
                {fights.map((fight) => (
                    <Paper
                        key={fight.id}
                        sx={{ p: 2, mb: 2 }}
                    >
                        <Typography variant="h6">
                            {fight.fighter1Name} vs {fight.fighter2Name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Date: {new Date(fight.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Time: {new Date(fight.createdAt).toLocaleTimeString()}
                        </Typography>
                        <Typography>
                            Winner: {fight.winner}
                        </Typography>

                        <Typography>
                            Rounds: {fight.log.length}
                        </Typography>

                        <Button
                            sx={{ mt: 1 }}
                            variant="outlined"
                            onClick={() => toggleLog(fight.id)}
                        >
                            {selectedFight === fight.id
                                ? "Hide Log"
                                : "View Log"}
                        </Button>

                        <Collapse in={selectedFight === fight.id}>
                            <Paper
                                variant="outlined"
                                sx={{ mt: 2, p: 2 }}
                            >
                                {fight.log.map((round, index) => (
                                    <Typography
                                        key={index}
                                        sx={{ mb: 1 }}
                                    >
                                        Round {index + 1} | Damage:
                                        {" "}
                                        {fight.fighter1Name}
                                        {" "}
                                        ({round.fighter1Shot})
                                        {" "}
                                        -
                                        {" "}
                                        {fight.fighter2Name}
                                        {" "}
                                        ({round.fighter2Shot})
                                        {" "}
                                        | Health:
                                        {" "}
                                        {fight.fighter1Name}
                                        {" "}
                                        ({round.fighter1Health})
                                        {" "}
                                        -
                                        {" "}
                                        {fight.fighter2Name}
                                        {" "}
                                        ({round.fighter2Health})
                                    </Typography>
                                ))}
                            </Paper>
                        </Collapse>
                    </Paper>
                ))}
            </DialogContent>
        </Dialog>
    );
}